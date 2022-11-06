const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const $btnPlusOperation = $("#btnPlusOperation"); // boton + nueva operacion // 
const $btnNewAdd = $("#btnNewAdd"); //boton de agregar en la pantalla nueva operacion // 
const $btnNewCancel = $("#btnNewCancel"); //boton cancelar en pantalla nueva operacion
const $btnEditAdd = $("#btnEditAdd"); //boton editar formulario en pantalla editar operacion  
const $btnEditCancel = $("#btnEditCancel") //bonton cancelar desde pantalla editar  
const $formEDit = $("#formEDit"); //id del form
const $tableOperations = $("#tableOperations"); //id de la tabla
 

// seletores nav
const navBalance = $("#navBalance");
const navCategories = $("#navCategories");
const navReports = $("#navReports");

// selectores formularios
const balance = $("#balance");
const categories = $("#categories");
const reports = $("#reports");
const addNewOperation = $("#addNewOperation");
const containerImage = $("#containerImage");
const textOperations = $("#textOperations");

// funcion esconder formularios desde el nav
navBalance.addEventListener("click", () => {
  balance.classList.remove("hidden");
  containerImage.classList.remove("hidden");
  categories.classList.add("hidden");
  addNewOperation.classList.add("hidden");
  reports.classList.add("hidden");
});

navCategories.addEventListener("click", () => {
  categories.classList.remove("hidden");
  balance.classList.add("hidden");
  reports.classList.add("hidden");
  addNewOperation.classList.add("hidden");
  containerImage.classList.add("hidden");
});

navReports.addEventListener("click", () => {
  reports.classList.remove("hidden");
  containerImage.classList.add("hidden");
  balance.classList.add("hidden");
  categories.classList.add("hidden");
  addNewOperation.classList.add("hidden");
});

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

// genera tabla con el registro de operaciones
const generateTable = (operations) => {
  $("#table").innerHTML = "";
  console.log(operations);
  operations.map((operation) => {
    const { id, description, category, type, amount, calendar } = operation;
    $("#table").innerHTML += `
      
             <tr> 
                  <td>${description}</td>
                  <td>${category}</td>
                  <td>${calendar}</td>
                  <td>${amount}</td>
                  <td><button  "id="btnEditTableElement" onclick="operationEdit(${id})">editar</button></td>
                  <td><button  id="btnDeleteTableElement" onclick="operationDelet(${id})">eliminar</button></td>
                 
             </tr>
         
          `;
  });
};

// funcion que ubica id del objeto
const findOperation = (id) => {
  return operations.find((product) => product.id === parseInt(id));
};

//funcion que deja vacia la pagina para mostrar otra seccion
const cleanPage = () => img.classList.add("hidden");

// funcion que trae form de edit con el objeto que el usuario completo en nueva operacion
const operationEdit = (id) => {
  $formEDit.classList.remove("hidden");
  balance.classList.add("hidden");
  containerImage.classList.add("hidden");
  $tableOperations.classList.remove("hidden");
  const chosenOperation = findOperation(id);
  $("#description").value = chosenOperation.description;
  $("#category").value = chosenOperation.category;
  $("#amount").value = chosenOperation.amount;
  $("#type").value = chosenOperation.type;
  $("#calendar").value = chosenOperation.calendar;

  $btnEditAdd.setAttribute("data-id", id);
};

//funcion y evento que cancela desde el boton cancelar del form editar operacion
const removeOperation = (id) => {
  return operations.filter((operation) => operation.id !== parseInt(id));
};

const operationDelet = (id) => {
  const $btnDeleteTableElement = $("#btnDeleteTableElement");
  $btnDeleteTableElement.setAttribute("data-id", id);
  const operationId = $btnDeleteTableElement.getAttribute("data-id");
  $formEDit.classList.add("hidden");
  $tableOperations.classList.remove("hidden");
  generateTable(removeOperation(operationId));
};

//funcion para almacenar modificaciones
const saveOperationData = (id) => {
  return {
    id: parseInt(id),
    description: $("#editDescription").value,
    category: $("#editCategory").value,
    amount: $("#editAmount").value,
    type: $("#editType").value,
    calendar: $("#editCalendar").value,
  };
};
// funcion para editar operacion previa
const editOperation = (id) => {
  return operations.map((operation) => {
    console.log(operation.id, parseInt(id), id);
    if (operation.id === parseInt(id)) {
      console.log("encontre el obj");
      return saveOperationData(id);
    }
    return operation;
  });
};
// evento para editar y mostrar modificaciones del usuario sobre una operacion previa
$btnEditAdd.addEventListener("click", () => {
  const operationId = $btnEditAdd.getAttribute("data-id");
  $formEDit.classList.add("hidden");
  $tableOperations.classList.remove("hidden");
  balance.classList.remove("hidden");
  containerImage.classList.remove("hidden");
  console.log(typeof operationId);
  generateTable(editOperation(operationId));
});

// function/evento que agrega la tabla de nueva operacion a pantalla principal
$btnNewAdd.addEventListener("click", () => {
  operations.push(newOperation());
  generateTable(operations);
  cleanPage();
  $tableOperations.classList.remove("hidden");
  balance.classList.remove("hidden");
  addNewOperation.classList.add("hidden");
  containerImage.classList.remove("hidden");
  textOperations.classList.add("hidden");
});

// function/evento de btn nueva Operacion, desde pantalla balance
$btnPlusOperation.addEventListener("click", () => {
  balance.classList.add("hidden");
  containerImage.classList.add("hidden");
  addNewOperation.classList.remove("hidden");
  $formEDit.classList.add("hidden");
});

//funtion/evento de btn cancelar desde pantalla nueva operacion
$btnNewCancel.addEventListener("click", () => {
  img.classList.add("hidden")
  containerImage.classList.remove("hidden")
  balance.classList.remove("hidden");
  addNewOperation.classList.add("hidden");
  $formEDit.classList.add("hidden");

  $tableOperations.classList.remove("hidden");
});

$btnEditCancel.addEventListener("click", () => {
  img.classList.add("hidden")
  containerImage.classList.remove("hidden")
  balance.classList.remove("hidden");
  addNewOperation.classList.add("hidden");
  $formEDit.classList.add("hidden");
  $tableOperations.classList.remove("hidden");
})