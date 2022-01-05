export const getDotSeparatedDate = (date: Date) => {
  return date.toLocaleString("ru", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

export const getLongDate = (date: Date) => {
  return date.toLocaleString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getShortWeekDay = (date: Date) => {
  return date.toLocaleString("ru", { weekday: "short" }).toUpperCase();
};

export const getTime = (date: Date) => {
  return date.toLocaleString("ru", {
    hour: "numeric",
    minute: "numeric",
  });
};

export const getTodayMidnightTime = () => {
  const date = new Date();
  const todayMidnightTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).getTime();
  return todayMidnightTime;
};
