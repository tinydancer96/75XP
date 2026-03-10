import db from '../../config/db.js';

export const getByProfile = async (profileId, dayNumber) => {
  const { rows } = await db.query(
    'SELECT * FROM days WHERE profile_id = $1 AND day_number = $2',
    [profileId, dayNumber]
  );
  return rows[0] || null;
};
