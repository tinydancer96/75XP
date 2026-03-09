const { Pool } = require("pg");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // validate fields
    if (!username || !email || !password) {
      return res.status(400).json({
        error: "username, email and password are required",
      });
    }

    const userId = uuidv4();

    // hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // create auth user
    await pool.query(
      `INSERT INTO auth.users (id, email, password_hash)
       VALUES ($1, $2, $3)`,
      [userId, email, passwordHash]
    );

    // create profile
    const result = await pool.query(
      `INSERT INTO profiles (id, username)
       VALUES ($1, $2)
       RETURNING *`,
      [userId, username]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (err) {
    // duplicate email or username
    if (err.code === "23505") {
      return res.status(409).json({
        error: "Email or username already exists",
      });
    }

    console.error(err);

    res.status(500).json({
      error: "Server error",
    });
  }
}

async function loginUser(req, res) {
  try {
    const { username } = req.body;

    const result = await pool.query("SELECT * FROM profiles WHERE username = $1", [username]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json({
      message: "Login successful",
      user: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error",
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
};
