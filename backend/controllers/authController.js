const { Pool } = require("pg");
const { v4: uuidv4 } = require("uuid");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function registerUser(req, res) {
  try {
    const { username, full_name } = req.body;

    if (!username || !full_name) {
      return res.status(400).json({
        error: "username and full_name are required",
      });
    }

    const userId = uuidv4();

    // create auth user
    await pool.query("INSERT INTO auth.users (id) VALUES ($1)", [userId]);

    // create profile
    const result = await pool.query(
      `INSERT INTO profiles (id, username, full_name)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [userId, username, full_name]
    );

    res.status(201).json({
      message: "User registered",
      user: result.rows[0],
    });
  } catch (err) {
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
