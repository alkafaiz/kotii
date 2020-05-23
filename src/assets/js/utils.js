import shortid from "shortid";

const MonthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export function getDate() {
  const currentDate = new Date();

  const date = currentDate.getDate();
  const month = currentDate.getMonth(); //Be careful! January is 0 not 1
  const year = currentDate.getFullYear();

  const dateString = `${date} ${MonthName[month]} ${year}`;
  return dateString;
}

export function generateMomentId(coupleId) {
  const currentDate = new Date();

  const date = currentDate.getDate();
  const month = currentDate.getMonth() + 1; //Be careful! January is 0 not 1
  const year = currentDate.getFullYear();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const second = currentDate.getSeconds();

  const Id = coupleId + year + month + date + hour + minute + second;
  return Id;
}

export function generateCoupleId() {
  return shortid.generate();
}

export function calculateDays(year, month, date) {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(year, month - 1, date);
  const secondDate = new Date();

  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  return diffDays;
}

export function getTimestampString(date) {
  if (!date || date === "") return "20 April 2039";

  const dateSplit = date.split(" ");
  const dateInt = parseInt(dateSplit[0]);
  const monthInt = MonthName.indexOf(dateSplit[1]) + 1;
  const yearInt = parseInt(dateSplit[2]);
  const diff = calculateDays(yearInt, monthInt, dateInt);

  if (diff === 1) return "Today";

  if (diff === 2) return "Yesterday";

  if (3 <= diff && diff <= 6) return `${diff - 1}d ago`;

  if (7 <= diff && diff <= 84) {
    const weekFloat = diff / 7;
    const weekInt = weekFloat.toString().split(".")[0];
    return `${weekInt}w ago`;
  }

  return date;
}
