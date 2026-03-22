export default function buildWeekSummary({ dayId, data }) {
  const weekStart = dayId - 6;
  const weekDays = data.filter((d) => d.day_number >= weekStart && d.day_number <= dayId);

  if (weekDays.length === 0) return null;

  const totalDays = weekDays.length;
  const dietDays = weekDays.filter((d) => d.diet_adhered).length;
  const indoorDays = weekDays.filter((d) => d.indoor_workout_completed).length;
  const outdoorDays = weekDays.filter((d) => d.outdoor_workout_completed).length;
  const readDays = weekDays.filter((d) => d.pages_read).length;
  const waterDays = weekDays.filter((d) => d.water_consumed).length;
  const avgMood = (weekDays.reduce((sum, d) => sum + d.mood_rating, 0) / totalDays).toFixed(1);

  const achievements = weekDays
    .map((d) => d.achievements)
    .filter(Boolean)
    .join(" ");
  const challenges = weekDays
    .map((d) => d.challenges)
    .filter(Boolean)
    .join(" ");

  return {
    stats: {
      diet: dietDays,
      indoor: indoorDays,
      outdoor: outdoorDays,
      read: readDays,
      water: waterDays,
      total: totalDays,
      avgMood,
    },
    achievements,
    challenges,
  };
}
