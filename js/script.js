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
///////////////////// BLOQUE DE OPERACIONES ///////////////////////////////////

//***************************  FUNCION QUE RECIBE DATOS DEL FORM Y RETORNA OBJETO ********************************/

const getNewOperation = (id) => {
  const description = $('#description').value;
  const category = $('#category').value;
  const amount = $('#amount').value;
  const type = $('#type').value;
  const calendar = $('#calendar').value;

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
    const isEarning = type === 'ganancia';
    const textClass = isEarning ? 'green-600' : 'red-600';
    const symbol = isEarning ? '+' : '-';

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

  $('#table').innerHTML = elements.join('');
};

//***************************  FUNCION QUE ENCUENTRA OPERACION POR ID ****************************/
