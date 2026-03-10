import { APIError } from '../middleware/errors.js';
import { getByProfile } from '../models/day.model.js';

export const fetchDayByUser = async (profileId, dayNumber) => {
  const day = await getByProfile(profileId, dayNumber);
  if (!day) throw new APIError('Day not found', 404);
  return day;
};
