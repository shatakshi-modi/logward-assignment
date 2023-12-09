export const formatDateString = (dateString) => {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const date = new Date(dateString);
  const day = date.getDate();
  const suffix =
    day >= 11 && day <= 13
      ? "th"
      : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][day % 10];

  return `${day}${suffix} ${date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })}`;
};

export const generateUniqueId = () => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

export const sortObj = {
  asc: (a, b) => a.date - b.date,
  desc: (a, b) => b.date - a.date,
};
