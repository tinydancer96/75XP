import { getDayByUser } from "../models/daysModel.js";

const fetchDayByUser = async (profile_id, day_number) => {
  if (day_number < 1 || day_number > 75) {
    const err = new Error("Invalid day numbers");
    err.status = 400;
    throw err;
  }
  const day = await getDayByUser(profile_id, day_number);

  if (!day) {
    const err = Error("Day not found");
    err.status = 404;
    throw err;
  }

  return {
    id: day.id,
    profile_id: day.profile_id,
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

export { fetchDayByUser };
