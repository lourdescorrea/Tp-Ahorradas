const operations = getDataFromLocalStorage(LS_KEYS.operations);

const filterFirstCalendarValue = filterFirstCalendar.value;
console.log(">>>>filterFirstCalendar", filterFirstCalendar);

const operaciones = filterFirstCalendar;
const fechaFiltro = "2022-11-13";

const getD = (str) => {
  const formated = str.split("-").reverse().join("-");
  return new Date(formated).setHours(0, 0, 0, 0);
};

const getFilterByDate = () => {
  const filterTimeStamp = new Date(fechaFiltro).setHours(0, 0, 0, 0);

  const result = operaciones.filter((op) => getD(op.date) >= filterTimeStamp);

  console.log(result);
};

getFilterByDate();
