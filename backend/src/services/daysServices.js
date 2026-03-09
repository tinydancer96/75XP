import { getDayById } from "../models/daysModel.js";

const fetchDayById = async (dayId, profileId) => {
  const day = await getDayById(dayId);

  if (!day) throw { status: 404, error: "Day not found" };
  if (day.profile_id !== profileId) throw { status: 403, error: "Forbidden" };

  return {
    id: day.id,
    day_number: day.day_number,
    progress_pic: day.progress_pic,
    reflection: {
      mood_rating: day.mood_rating,
      achievements: day.achievements,
      challenges: day.challenges,
      next_day_focus: day.next_day_focus,
    },
  };
};

export { fetchDayById };
