import db from "../db/connection.js";

const getDayById = async (dayId) => {
  const { rows } = await db.query(
    `
    SELECT
        days.id,
        days.profile_id,
        days.day_number,
        days.progress_pic,
        reflections.mood_rating,
        reflections.achievements,
        reflections.challenges,
        reflections.next_day_focus
    FROM
        days
    LEFT JOIN reflections ON reflections.day_id = days.id
    WHERE
        days.id = $1;
        `,
    [dayId]
  );
  return rows[0];
};

export { getDayById };
