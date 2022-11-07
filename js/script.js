const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const $btnPlusOperation = $("#btnPlusOperation"); // boton + nueva operacion //
const $btnNewAdd = $("#btnNewAdd"); //boton de agregar en la pantalla nueva operacion //
const $btnNewCancel = $("#btnNewCancel"); //boton cancelar en pantalla nueva operacion
const $btnEditAdd = $("#btnEditAdd"); //boton editar formulario en pantalla editar operacion
const $btnEditCancel = $("#btnEditCancel"); //bonton cancelar desde pantalla editar
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

const LS_KEYS = {
  operations: "operations",
  categories: "categories",
};

const CATEGORIES_BASE = [
  {
    id: 0,
    name: "Comida",
  },
  {
    id: 1,
    name: "Servicios",
  },
  {
    id: 2,
    name: "Salidas",
  },
  {
    id: 3,
    name: "Educacion",
  },
  {
    id: 4,
    name: "Transporte",
  },
  {
    id: 5,
    name: "Trabajo",
  },
];

//************************************** FUNCIONES NAVEGACION **************************************/
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
  CategoriesGenerateTable();
});

navReports.addEventListener("click", () => {
  reports.classList.remove("hidden");
  containerImage.classList.add("hidden");
  balance.classList.add("hidden");
  categories.classList.add("hidden");
  addNewOperation.classList.add("hidden");
});

//************************************** FUNCIONES PARA LOCAL STORAGE **************************************/
const getDataFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const setDataToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const removeLocalStorage = (ops) => {
  setDataToLocalStorage("operations", ops);
};
///////////////////// BLOQUE DE OPERACIONES ///////////////////////////////////

//***************************  FUNCION QUE RECIBE DATOS DEL FORM Y RETORNA OBJETO ********************************/

const getNewOperation = (id) => {
  const description = $("#description").value;
  const category = $("#category").value;
  const amount = $("#amount").value;
  const type = $("#type").value;
  const calendar = $("#calendar").value;

  return {
    id,
    description,
    category,
    type,
    amount,
    calendar,
  };
};

//***************************  FUNCION QUE CREA TABLA ****************************/
const generateTable = () => {
  const operations = getDataFromLocalStorage(LS_KEYS.operations);

  const elements = operations.map((operation) => {
    const { id, description, category, type, amount, calendar } = operation;
    const isEarning = type === "ganancia";
    const textClass = isEarning ? "green-600" : "red-600";
    const symbol = isEarning ? "+" : "-";

    return `
            <tr> 
                <td>${description}</td>
                <td>${category}</td>
                <td>${calendar}</td>
                <td class="mt-0 pt-0 pl-12 text-lg text-${textClass} font-bold">${symbol}${amount}</td>
                <td><button  id="btnEditTableElement" onclick="operationEdit(${id})">editar</button></td>
                <td><button  id="btnDeleteTableElement" data-id="${id}" onclick="operationDelet(${id})">eliminar</button></td>
            </tr>
            `;
  });

  $("#table").innerHTML = elements.join("");
};
//***************************  FUNCION QUE ENCUENTRA OPERACION POR ID ****************************/

const findOperation = (id) => {
  const operations = getDataFromLocalStorage(LS_KEYS.operations);
  return operations.find((operation) => operation.id === parseInt(id));
};
//***************************  FUNCION QUE ESCONDE LA IMG ****************************/
const cleanPage = () => img.classList.add("hidden");

const showTable = () => {
  $tableOperations.classList.remove("hidden");
  img.classList.add("hidden");
  textOperations.classList.add("hidden");
  containerImage.classList.remove("hidden");
  balance.classList.remove("hidden");
};

const showEmptyPage = () => {
  $tableOperations.classList.add("hidden");
  img.classList.remove("hidden");
  textOperations.classList.remove("hidden");
};

const hideNewOperationsForm = () => {
  addNewOperation.classList.add("hidden");
};

const showEditOperationForm = () => {
  $formEDit.classList.remove("hidden");
  $tableOperations.classList.remove("hidden");
  balance.classList.add("hidden");
  containerImage.classList.add("hidden");
};

const hideEditOperationForm = () => {
  $formEDit.classList.add("hidden");
};

//***************************  FUNCION QUE TRAE FORMULARIO DE EDITAR  ****************************/

const operationEdit = (id) => {
  const chosenOperation = findOperation(id);

  $("#editDescription").value = chosenOperation.description;
  $("#editCategory").value = chosenOperation.category;
  $("#editAmount").value = chosenOperation.amount;
  $("#editType").value = chosenOperation.type;
  $("#editCalendar").value = chosenOperation.calendar;

  $btnEditAdd.setAttribute("data-id", id);

  showEditOperationForm();
};
/***************************  FUNCION QUE REMUEVE OBJETO  ****************************/
const removeOperation = (id) => {
  const operations = getDataFromLocalStorage(LS_KEYS.operations);
  const newOperations = operations.filter((operation) => operation.id !== id);
  setDataToLocalStorage(LS_KEYS.operations, newOperations);
  return newOperations;
};

const operationDelet = (id) => {
  const operations = removeOperation(id);

  if (operations.length === 0) {
    showEmptyPage();
  } else {
    generateTable();
    showTable();
  }
};
//***************************  FUNCION PARA ALMACENAR LAS MODIFICACIONES  ****************************/

const saveOperationData = (id) => {
  return {
    id: id,
    description: $('#editDescription').value,
    category: $('#editCategory').value,
    amount: $('#editAmount').value,
    type: $('#editType').value,
    calendar: $('#editCalendar').value,
  };
};
//***************************  FUNCION  PARA EDITAR OPERACION  ****************************/

const editOperation = (id) => {
  const operations = getDataFromLocalStorage(LS_KEYS.operations);

  return operations.map((operation) => {
    if (operation.id === parseInt(id)) {
      return saveOperationData(id);
    }
    return operation;
  });
};