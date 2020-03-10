import shortid from "shortid";

export function getDate() {
  const currentDate = new Date();
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
  const date = currentDate.getDate();
  const month = currentDate.getMonth(); //Be careful! January is 0 not 1
  const year = currentDate.getFullYear();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const second = currentDate.getSeconds();

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
