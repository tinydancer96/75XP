const { getDayById } = require("../models/dayModel");

const fetchDayById = async (dayId, profileId) => {
  const day = await getDayById(dayId);

  if (!day) return { status: 404, error: "Day not found" };
  if (day.profile_id !== profileId) return { status: 403, error: "Forbidden" };

  return {
    status: 200,
    data: {
      id: day.id,
      day_number: day.day_number,
      progress_pic: day.progress_pic,
      reflection: {
        mood_rating: day.mood_rating,
        achievements: day.achievements,
        challenges: day.challenges,
        next_day_focus: day.next_day_focus,
      },
    },
  };
};

module.exports = { fetchDayById };
