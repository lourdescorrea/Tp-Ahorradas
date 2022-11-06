localStorage.setItem(operations);

let operations = [];

const newOperation = () => {
  const description = $("#description").value;
  const category = $("#category").value;
  const amount = $("#amount").value;
  const type = $("#type").value;
  const calendar = $("#calendar").value;
  const id = operations.length + 1;

  return {
    id,
    description,
    category,
    type,
    amount,
    calendar,
  };
};
