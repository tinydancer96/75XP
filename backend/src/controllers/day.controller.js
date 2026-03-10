import { APIError } from '../middleware/errors.js';
import { fetchDayByUser } from '../services/day.service.js';

const getDay = async (req, res, next) => {
  try {
    const dayNumber = parseInt(req.params.day_number, 10);
    if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 75) {
      throw new APIError('Invalid day number', 400);
    }

    const data = await fetchDayByUser(req.params.profile_id, dayNumber);

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export { getDay };
