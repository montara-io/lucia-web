import moment from "moment";

const locale = navigator.language;

export const calcDatesFromToday = (numOfMarks: number, intl) => {
  const dates = buildMarksArray(4, intl);

  let arr = new Array(numOfMarks).fill("");
  let split = Math.floor(numOfMarks / 3);
  arr[0] = dates[0];
  arr[split] = dates[1];
  arr[split * 2] = dates[2];
  arr[numOfMarks - 1] = dates[3];
  return arr;
};

export const buildMarksArray = (numOfLabels, intl) => {
  const todayData = moment().locale(locale);

  const dates = new Array(numOfLabels).fill("").map(() => {
    let howManyMonthToSubtract = 2;
    return todayData
      .subtract(howManyMonthToSubtract, "months")
      .format("MMM YYYY")
      .toUpperCase();
  });
  dates.reverse().shift();
  dates.push(intl.formatMessage({ id: "today", defaultMessage: "TODAY" }));

  return dates;
};
