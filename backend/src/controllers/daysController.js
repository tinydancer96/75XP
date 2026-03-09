const { fetchDayById } = require("../services/daysServices");

const getDay = async (req, res, next) => {
  try {
    const { dayId } = req.params;
    const profileId = req.user.id;
    const { status, data, error } = await fetchDayById(dayId, profileId);
    res.status(status).json(data ?? { error });
  } catch (err) {
    next(err);
  }
};

module.exports = { getDay };
