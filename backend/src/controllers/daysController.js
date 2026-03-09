import { fetchDayById } from "../services/daysServices.js";

const getDay = async (req, res, next) => {
  try {
    const { dayId } = req.params;
    const profileId = req.user.id;
    const data = await fetchDayById(dayId, profileId);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export { getDay };
