const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const $btnPlusOperation = $("#btnPlusOperation"); // boton + nueva operacion //
const $btnNewAdd = $("#btnNewAdd"); //boton de agregar en la pantalla nueva operacion //
const $btnNewCancel = $("#btnNewCancel"); //boton cancelar en pantalla nueva operacion
const $btnEditAdd = $("#btnEditAdd"); //boton editar formulario en pantalla editar operacion
const $btnEditCancel = $("#btnEditCancel"); //bonton cancelar desde pantalla editar
const $formEDit = $("#formEDit"); //id del form
const $tableOperations = $("#tableOperations"); //id de la tabla
const $Ganancias = $("#Ganancias");
const $Gastos = $("#Gastos");
const $Total = $("#Total");

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

////////////////////////////////////////BLOQUE FUNCIONES BASE//////////////////////////////////////////////

//********************************** FUNCIONES NAVEGACION **********************************/

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

//****************************** FUNCIONES PARA LOCAL STORAGE **********************************/

const getDataFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const setDataToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const removeLocalStorage = (ops) => {
  setDataToLocalStorage("operations", ops);
};


//////////////////////////////////////////BLOQUE OPERACIONES/////////////////////////////////////////////////

//****************************** FUNCION QUE GENERA EL ID ****************************/

const nums = "123456789";
const mayus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const generadorID = () => {
  let id = [];

  while (id.length < 10) {
    const num = Math.floor(Math.random() * nums.length);

    const num1 = Math.floor(Math.random() * mayus.length);

    id.push(nums[num]);
    id.push(mayus[num1]);
  }

  return id.join("");
};

//***************************  FUNCION QUE RECIBE DATOS DEL FORM Y RETORNA OBJETO ****************************/

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

//***************************  FUNCION QUE LIMPIA DATOS DEL FORM DE NUEVA OPERACION **************************/

const cleanNewOperation = () => {
  $("#description").value = "";
  $("#category").value = "";
  $("#amount").value = "";
  $("#type").value = "";
  const calendar = $("#calendar").value;
};

//***************************  FUNCION QUE CREA LA TABLA ****************************/

const generateTable = () => {
  const operations = getDataFromLocalStorage(LS_KEYS.operations);

  const elements = operations.map((operation) => {
    const { id, description, category, type, amount, calendar } = operation;
    const isEarning = type === "ganancia";
    const textClass = isEarning ? "green-600" : "red-600";
    const symbol = isEarning ? "+" : "-";

    return `
            <tr class=""> 
                <td>${description}</td>
                <td>${category}</td>
                <td>${calendar}</td>
                <td class="text-lg text-${textClass} font-bold">${symbol}${amount}</td>
                <td><button class="rounded hover:bg-indigo-400" id="btnEditTableElement" onclick="operationEdit('${id}')">editar</button></td>
                <td ><button  class="pr-18 rounded hover:bg-indigo-400" id="btnDeleteTableElement" data-id='${id}' onclick="operationDelet('${id}')">eliminar</button></td>
             
             </tr>
            `;
  });

  $("#table").innerHTML = elements.join("");
};

//***************************  FUNCION QUE ENCUENTRA OPERACION POR ID ****************************/

const findOperation = (id) => {
  const operations = getDataFromLocalStorage(LS_KEYS.operations);
  return operations.find((operation) => operation.id === id);
};

//***************************  FUNCION QUE ESCONDE  ****************************/

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
    totalBalance();
    earningsBalance();
    spendingBalance();
  } else {
    generateTable();
    showTable();
    totalBalance();
    earningsBalance();
    spendingBalance();
  }
};

//***************************  FUNCION PARA ALMACENAR LAS MODIFICACIONES  ****************************/

const saveOperationData = (id) => {
  return {
    id: id,
    description: $("#editDescription").value,
    category: $("#editCategory").value,
    amount: $("#editAmount").value,
    type: $("#editType").value,
    calendar: $("#editCalendar").value,
  };
};

//***************************  FUNCION  PARA EDITAR OPERACION  ****************************/

const editOperation = (id) => {
  const operations = getDataFromLocalStorage(LS_KEYS.operations);

  return operations.map((operation) => {
    if (operation.id === id) {
      return saveOperationData(id);
    }
    return operation;
  });
};
// //*************************** FUNCION QUE VALIDA EL FORM DE OPERACIONES *************************/

const validation = () => {
  if (
    amount.value === "" ||
    description.value === "" ||
    type.value === "" ||
    category.value === ""
  ) {
    return false;
  } else {
    return true;
  }
};
// //************************ FUNCION QUE VALIDA EL FORM DE EDITAR OPERACIONES **************************/

const validationOperations = () => {
  if (
    editDescription.value === "" ||
    editAmount.value === "" ||
    editType.value === "" ||
    editCategory.value === ""
  ) {
    return false;
  } else {
    return true;
  }
};

//************************************* EVENTO PARA EDITAR OPERACION **********************************/

$btnEditAdd.addEventListener("click", () => {
  const isValidOperations = validationOperations();
  if (!isValidOperations) {
    return alert("Debe completar los campos");
  }
  const id = $btnEditAdd.getAttribute("data-id");
  const operations = editOperation(id);

  setDataToLocalStorage(LS_KEYS.operations, operations);

  generateTable();
  hideEditOperationForm();
  showTable();
  totalBalance();
  earningsBalance();
  spendingBalance();
});

//****************** EVENTO QUE AGREGA LA TABLA DE OPERACIONES A LA PANTALLA PRINCIPAL *******************/

$btnNewAdd.addEventListener("click", () => {
  const isValid = validation();
  if (!isValid) {
    return alert("Debe completar los campos");
  }
  const operations = getDataFromLocalStorage(LS_KEYS.operations);
  const newOperation = getNewOperation(generadorID());
  operations.push(newOperation);

  setDataToLocalStorage(LS_KEYS.operations, operations);

  generateTable();

  hideNewOperationsForm();
  showTable();

  totalBalance();
  earningsBalance();
  spendingBalance();
  generadorID();
});

//******************** EVENTO NUEVA OPERACION DESDE PANTALLA BALANCE **********************/

$btnPlusOperation.addEventListener("click", () => {
  balance.classList.add("hidden");
  containerImage.classList.add("hidden");
  addNewOperation.classList.remove("hidden");
  $formEDit.classList.add("hidden");
  cleanNewOperation();
});

//******************** EVENTO PARA CANCELAR DESDE PANTALLA NUEVA OPERACION **********************/

$btnNewCancel.addEventListener("click", () => {
  img.classList.add("hidden");
  containerImage.classList.remove("hidden");
  balance.classList.remove("hidden");
  addNewOperation.classList.add("hidden");
  $formEDit.classList.add("hidden");
  $tableOperations.classList.remove("hidden");
});

//******************** EVENTO PARA CANCELAR DESDE PANTALLA EDITAR **********************/

$btnEditCancel.addEventListener("click", () => {
  showTable();
  hideEditOperationForm();
});

const onLoadOperations = () => {
  const operations = getDataFromLocalStorage(LS_KEYS.operations);
  if (!operations || operations.length === 0) {
    setDataToLocalStorage(LS_KEYS.operations, []);
  } else {
    generateTable();
    showTable();
  }
};


//  * ========================================================================================================================
//  *
//  * ========================================================================================================================
//  *
//  * ========================================================================================================================

           //////////////////////////////// BLOQUE BALANCE Y FILTROS ////////////////////////////////////


            // ************************************* BALANCE ********************************/

//********************************** FUNCION QUE FILTRA Y ACUMULA GANANCIAS ********************************/

const earningsBalance = () => {
  const operations = getDataFromLocalStorage(LS_KEYS.operations);
  let acumulatedEarnings = 0;
  $("#Ganancias").innerText = acumulatedEarnings;
  for (const { amount, type } of operations) {
    if (type === "ganancia") {
      acumulatedEarnings += parseInt(amount);
    }
    $("#Ganancias").innerText = acumulatedEarnings;
  }
  return acumulatedEarnings;
};

// //******************************** FUNCION QUE FILTRA Y ACUMULA GASTOS *************************/

const spendingBalance = () => {
  let acumulatedSpent = 0;
  $("#Gastos").innerText = acumulatedSpent;
  const operations = getDataFromLocalStorage(LS_KEYS.operations);

  for (const { amount, type } of operations) {
    if (type !== "ganancia") {
      acumulatedSpent -= parseInt(amount);
    }

    $("#Gastos").innerText = acumulatedSpent;
  }
  return acumulatedSpent;
};

// //********************************* FUNCION QUE CALCULA EL TOTAL ********************************/

const totalBalance = () => {
  const acumulatedEarnings = earningsBalance();
  const acumulatedSpent = spendingBalance();
  let total = acumulatedEarnings + acumulatedSpent;
  $("#Total").innerText = total;
  return total;
};


     // ******************************************** FILTROS ********************************/

//  * ========================================================================================================================
//  *
//  * ========================================================================================================================
//  *
//  * ========================================================================================================================

////////////////////////////////////////BLOQUE FUNCIONES BASE//////////////////////////////////////////////

const $containerCategories = $("#containerCategories");
const $categories = $("#categories");
const $btnEditCategories = $("#btnEditCategories");
const CATEGORIES_BASE = [
  {
    id: generadorID(),
    name: "Comida",
  },
  {
    id: generadorID(),
    name: "Servicios",
  },
  {
    id: generadorID(),
    name: "Salidas",
  },
  {
    id: generadorID(),
    name: "Educacion",
  },
  {
    id: generadorID(),
    name: "Transporte",
  },
  {
    id: generadorID(),
    name: "Trabajo",
  },
];

//************************ FUNCION QUE CREA  LA TABLA *****************************************//

const CategoriesGenerateTable = () => {
  const categories = getDataFromLocalStorage(LS_KEYS.categories);

  const elements = categories.map((category) => {
    const { id, name } = category;
    return ` 
                 <tr class="pl-60">
                    <td class="pr-60">${name}</td>
                    <td class="px-4 pl-60" ><button class="pl-90 rounded hover:bg-indigo-400" id="editCategories" onclick="categoryEdit('${id}')">Editar</button></td>
                    <td> <button class="pl-90 rounded hover:bg-indigo-400 " id="btnCancelCategories" onclick="categoryDelet('${id}')">Eliminar</button></td>
                  </tr>     
                  
            `;
  });

  $("#categories-table").innerHTML = elements.join("");
};

// //************************  FUNCION QUE LIMPIA DATOS DEL INPUT EN CATEGORIAS   *****************************************//

const cleanNewCategory = () => {
  $("#categoriesInput").value = "";
};

// //************************ FUNCION QUE UBICA EL ID DEL OBJETO *****************************************//

const findCategory = (id) => {
  const categories = getDataFromLocalStorage(LS_KEYS.categories);
  return categories.find((category) => category.id === id);
};

//*************************** FUNCION QUE CREA UNA NUEVA CATEGORIA *********************************//

const getNewCategory = (id) => {
  const categoriesInput = $("#categoriesInput").value;
  return {
    id,
    name: categoriesInput,
  };
};

//*************************** FUNCION QUE EDITA UNA CATEGORIA *********************************//

const editCategory = (id) => {
  const isValidEdit = validationEditCategory();
  if (!isValidEdit) {
    return alert("Debe completar los campos");
  } else {
    const categories = getDataFromLocalStorage(LS_KEYS.categories);

    return categories.map((category) => {
      if (category.id === id) {
        return {
          id: id,
          name: $("#categoryNameInput").value,
        };
      }
      return category;
    });
  }
};

//*************************** FUNCION PARA FILTRAR CATEGORIA *********************************//

const removeCategories = (id) => {
  const categories = getDataFromLocalStorage(LS_KEYS.categories);
  return categories.filter((category) => category.id !== id);
};

//*************************** FUNCION PARA ELIMINAR CATEGORIA *********************************//

const categoryDelet = (id) => {
  const categories = removeCategories(id);
  setDataToLocalStorage(LS_KEYS.categories, categories);
  CategoriesGenerateTable();
};

//*************************** FUNCION PARA EDITAR CATEGORIA *********************************//

const categoryEdit = (id) => {
  $categories.classList.add("hidden");
  $containerCategories.classList.remove("hidden");
  const chosenOperation = findCategory(id);
  $("#categoryNameInput").value = chosenOperation.name;
  $btnEditCategories.setAttribute("data-id", id);
};

//*************************** FUNCION PARA VALIDAR FORM DE EDITAR CATEGORIA *********************************//

const validationCategory = () => {
  if (categoriesInput.value === "") {
    return false;
  } else {
    return true;
  }
};
//*************************** FUNCION PARA VALIDA LOS CAMPOS DE CATEGORIAS *********************************//
const validationEditCategory = () => {
  if (categoriesInput.value === "") {
    return false;
  } else {
    return true;
  }
};
//*************************** EVENTO QUE PUSHEA NUEVA CATEGORIA A LA TABLA ********************************//

$("#btnCategoryAdd").addEventListener("click", () => {
  const isValidCategory = validationCategory();
  if (!isValidCategory) {
    return alert("Debe completar los campos");
  } else {
    const categories = getDataFromLocalStorage(LS_KEYS.categories);
    const newCategory = getNewCategory(generadorID());

    categories.push(newCategory);

    setDataToLocalStorage(LS_KEYS.categories, categories);
    CategoriesGenerateTable();
    cleanNewCategory();
  }
});

//*************************** EVENTO PARA CANCELAR DESDE PANTALLA EDITAR *********************************//

$("#btnCancelCategories").addEventListener("click", () => {
  $categories.classList.remove("hidden");
  $containerCategories.classList.add("hidden");
});

//*************************** EVENTO PARA EDITAR CATEGORIA *********************************//

$("#btnEditCategories").addEventListener("click", () => {
  const id = $btnEditCategories.getAttribute("data-id");
  const categories = editCategory(id);

  setDataToLocalStorage(LS_KEYS.categories, categories);

  CategoriesGenerateTable();
  $categories.classList.remove("hidden");
  $containerCategories.classList.add("hidden");
});



//*************************** EVENTO PARA SETEAR DATOS EN LOCAL STORAGE *********************************//

const onLoadCategories = () => {
  const categories = getDataFromLocalStorage(LS_KEYS.categories);
  if (!categories) {
    setDataToLocalStorage(LS_KEYS.categories, CATEGORIES_BASE);
  }
};

//*************************** EVENTO PARA CARGA INICIAL *********************************//

window.addEventListener("load", () => {
  onLoadOperations();
  onLoadCategories();

  earningsBalance();
  spendingBalance();
  totalBalance();
  generadorID();
});

//*************************** FUNCIONES PARA FILTRAR *********************************//
const filterType = $("#filterType");
const filterCalendar = $("#filterCalendar");
const filtersCategory = $("#filtersCategory");
const filtersSortBy = $("#filtersSortBy");
const btnHideFilters = $("#btnHideFilters");
const btnShowFilters = $("#btnShowFilters");
const filters = $("#filters");

$("#btnHideFilters").addEventListener("click", () => {
  filters.classList.add("hidden");
  btnHideFilters.classList.add("hidden");
  btnShowFilters.classList.remove("hidden");
});

$("#btnShowFilters").addEventListener("click", () => {
  filters.classList.remove("hidden");
  btnHideFilters.classList.remove("hidden");
  btnShowFilters.classList.add("hidden");
});
