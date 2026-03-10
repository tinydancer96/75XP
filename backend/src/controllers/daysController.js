import { fetchDayByUser } from "../services/daysServices.js";

const getDayByUser = async (req, res, next) => {
  try {
    const { profile_id, day_number } = req.params;
    const data = await fetchDayByUser(profile_id, day_number);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export { getDayByUser };
