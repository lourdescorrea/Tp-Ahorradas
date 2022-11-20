const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const $btnPlusOperation = $("#btnPlusOperation"); 
const $btnNewAdd = $("#btnNewAdd"); 
const $btnNewCancel = $("#btnNewCancel"); 
const $btnEditAdd = $("#btnEditAdd"); 
const $btnEditCancel = $("#btnEditCancel"); 
const $formEDit = $("#formEDit"); 
const $tableOperations = $("#tableOperations"); 
const $earnings = $("#earnings");
const $expenses = $("#expenses");
const $total = $("#total");

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
  $containerCategories.classList.add("hidden");
});

navCategories.addEventListener("click", () => {
  categories.classList.remove("hidden");
  balance.classList.add("hidden");
  reports.classList.add("hidden");
  addNewOperation.classList.add("hidden");
  containerImage.classList.add("hidden");
  $containerCategories.classList.add("hidden");
});

navReports.addEventListener("click", () => {
  reports.classList.remove("hidden");
  containerImage.classList.add("hidden");
  balance.classList.add("hidden");
  categories.classList.add("hidden");
  addNewOperation.classList.add("hidden");
  $containerCategories.classList.add("hidden");
  reportsDateGenerateTable();
  reportsGenerateTable();
  generateReportsTable()
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

const numbers = "123456789";
const capital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const generatorID = () => {
  let id = [];

  while (id.length < 10) {
    const num = Math.floor(Math.random() * numbers.length);

    const num1 = Math.floor(Math.random() * capital.length);

    id.push(numbers[num]);
    id.push(capital[num1]);
  }

  return id.join("");
};

//***************************  FUNCION QUE RECIBE DATOS DEL FORM Y RETORNA OBJETO ****************************/

const getNewOperation = (id) => {
  const description = $("#description").value;
  const amount = $("#amount").value;
  const type = $("#type").value;
  const category = $("#newOperationCategories").value;

  return {
    id,
    description,
    category,
    type,
    amount,
    calendar: calendar.value,
  };
};

//***************************  FUNCION QUE CREA LA TABLA ****************************/

const generateTable = (filteredOperations) => {
  const operations =
    filteredOperations || getDataFromLocalStorage(LS_KEYS.operations);

  const elements = operations.map((operation) => {
    const { id, description, category, type, amount, calendar } = operation;
    const isEarning = type === "ganancia";
    const textClass = isEarning ? "green-600" : "red-600";
    const symbol = isEarning ? "+" : "-";

    return `
            <tr class="text-center text-base"> 
                <td class="collapse md:visible">${description}</td>
                <td class=" category">
                 <span class="items-center mr-16 md:mr-0 bg-[#e1bee7] text-[#ba68c8] rounded">${category}</span>
                </td>
                <td class="calendar">${reverseDate(calendar)}</td>
                <td class=" amount text-lg text-${textClass} font-bold">${symbol}${amount}</td>
                <td>
                 <span class="flex justify-center p-2">
                   <i class="fa-solid fa-pen m-3 mr-2 text-[#ba68c8] text-lg hover:text-green-600" id="btnEditTableElement" onclick="operationEdit('${id}')"></i>
                   <i class=" fa-solid fa-trash-can m-3 mr-8 text-[#ba68c8] text-lg hover:text-red-600" id="btnDeleteTableElement" data-id='${id}' onclick="operationDelet('${id}')"></i>
                 </span> 
                <td>
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

//***************************  FUNCIONES DOM  ****************************/

const cleanPage = () => img.classList.add("hidden");

const showTable = () => {
  $tableOperations.classList.remove("hidden");
  img.classList.add("hidden");
  containerImage.classList.remove("hidden");
  balance.classList.remove("hidden");
};

const showEmptyPage = () => {
  $tableOperations.classList.add("hidden");
  img.classList.remove("hidden");
};

const showEmptyReports = () => {
  $("#tableReports").classList.add("hidden");
  imageReports.classList.remove("hidden");
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

  CategoriesGenerateNewOperation("#editCategory");
  showEditOperationForm();
};

/***************************  FUNCION QUE ELIMINA OPERACIONES  ***************************/

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

//***************************  FUNCION QUE LIMPIA DATOS DEL FORM DE NUEVA OPERACION **************************/

const cleanNewOperation = () => {
  $("#description").value = "";

  $("#amount").value = "";
  $("#type").value = "";
  const calendar = $("#calendar").value;
};

// //*************************** FUNCION QUE VALIDA EL FORM DE OPERACIONES *************************/

const validation = () => {
  if (amount.value === "" || description.value === "" || type.value === "") {
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
    editType.value === ""
  ) {
    return false;
  } else {
    return true;
  }
};

// ******************************* FUNCION QUE CREA CATEGORIAS EN FORM DE NUEVA OP ********************//

const CategoriesGenerateNewOperation = (id) => {
  const categories = getDataFromLocalStorage(LS_KEYS.categories);
  const options = [];
  for (const { id, name } of categories) {
    options.push(
      `<option  id='${id}'   class="flex flex col">${name}</option>`
    );
  }
  $(id).innerHTML = options.join("");
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

//********** EVENTO QUE AGREGA LA TABLA DE OPERACIONES A LA PANTALLA PRINCIPAL **************/

$btnNewAdd.addEventListener("click", () => {
  const isValid = validation();
  if (!isValid) {
    return alert("Debe completar los campos");
  }
  const operations = getDataFromLocalStorage(LS_KEYS.operations);
  const newOperation = getNewOperation(generatorID());
  operations.push(newOperation);

  setDataToLocalStorage(LS_KEYS.operations, operations);

  generateTable();

  hideNewOperationsForm();
  showTable();

  totalBalance();
  earningsBalance();
  spendingBalance();
  generatorID();
});

//******************** EVENTO NUEVA OPERACION DESDE PANTALLA BALANCE **********************/

$btnPlusOperation.addEventListener("click", () => {
  balance.classList.add("hidden");
  containerImage.classList.add("hidden");
  addNewOperation.classList.remove("hidden");
  $formEDit.classList.add("hidden");
  $containerCategories.classList.add("hidden");

  calendar.value = getToday();
  cleanNewOperation();
  CategoriesGenerateNewOperation("#newOperationCategories");
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

////////////////////////////////////// BLOQUE FUNCIONES BASE CATEGORIAS //////////////////////////////////////////

const $containerCategories = $("#containerCategories");
const $editCategories = $("#editCategories");
const $categories = $("#categories");
const $btnEditCategories = $("#btnEditCategories");
const CATEGORIES_BASE = [
  {
    id: generatorID(),
    name: "comida",
  },
  {
    id: generatorID(),
    name: "servicios",
  },
  {
    id: generatorID(),
    name: "salidas",
  },
  {
    id: generatorID(),
    name: "educación",
  },
  {
    id: generatorID(),
    name: "transporte",
  },
  {
    id: generatorID(),
    name: "trabajo",
  },
];

//********************************* FUNCION QUE CREA LA TABLA *****************************************//

const CategoriesGenerateTable = () => {
  const categories = getDataFromLocalStorage(LS_KEYS.categories);

  const elements = categories.map((category) => {
    const { id, name } = category;
    return ` 
                <tr class="text-center">
                     <td class="text-white lg:pl-16 text-start ">
                       <span class="bg-[#e1bee7] text-[#ba68c8] rounded">${name}</span>
                     </td>
                     <td class="flex justify-center p-2"> 
                       <i class="fa-solid fa-pen m-3 text-[#ba68c8] text-lg hover:text-green-600" id="editCategories" onclick="categoryEdit('${id}')"></i>
                       <i class="fa-solid fa-trash-can m-3 text-[#ba68c8] text-lg hover:text-red-600" id="btnCancelCategories" onclick="categoryDelet('${id}')"></i>
                     </td>
                  </tr> 
                  
            `;
  });

  $("#categoriesTable").innerHTML = elements.join("");
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
};

//*************************** FUNCION PARA FILTRAR CATEGORIA *********************************//

const removeCategories = (id) => {
  const categories = getDataFromLocalStorage(LS_KEYS.categories);
  const category = categories.find((category) => category.id === id);
  removeAllOperations(category.name);
  return categories.filter((category) => category.id !== id);
};

//********************* FUNCION QUE ELIMINA TODAS LAS OPERACIONES DE UNA CATEGORIA ***************************/

const removeAllOperations = (categoryNameInput) => {
  const operations = getDataFromLocalStorage(LS_KEYS.operations);
  const operationsfiltered = operations.filter(
    (operation) => operation.category !== categoryNameInput
  );
  setDataToLocalStorage(LS_KEYS.operations, operationsfiltered);
};

//*************************** FUNCION PARA ELIMINAR CATEGORIA *********************************//

const categoryDelet = (id) => {
  const categories = removeCategories(id);
  setDataToLocalStorage(LS_KEYS.categories, categories);
  CategoriesGenerateTable();
  CategoriesGenerateFilter();
  generateTable();
};

//*************************** FUNCION PARA EDITAR CATEGORIA *********************************//

const categoryEdit = (id) => {
  $categories.classList.add("hidden");
  $containerCategories.classList.remove("hidden");
  const chosenOperation = findCategory(id);
  $("#categoryNameInput").value = chosenOperation.name;
  $btnEditCategories.setAttribute("data-id", id);
};

//********************* FUNCION PARA VALIDAR FORM DE EDITAR CATEGORIA ***************//

const validationCategory = () => {
  if (categoriesInput.value === "") {
    return false;
  } else {
    return true;
  }
};
//******************** FUNCION PARA VALIDA LOS CAMPOS DE CATEGORIAS ***************//
const validationEditCategory = () => {
  if (categoryNameInput.value !== "") {
    return true;
  } else {
    return false;
  }
};
//****************** EVENTO QUE PUSHEA NUEVA CATEGORIA A LA TABLA ********************//

$("#btnCategoryAdd").addEventListener("click", () => {
  const isValidCategory = validationCategory();
  if (!isValidCategory) {
    return alert("Debe completar los campos");
  } else {
    const categories = getDataFromLocalStorage(LS_KEYS.categories);
    const newCategory = getNewCategory(generatorID());

    categories.push(newCategory);

    setDataToLocalStorage(LS_KEYS.categories, categories);
    CategoriesGenerateTable();
    CategoriesGenerateFilter();
    cleanNewCategory();
  }
});

//*************************** EVENTO PARA CANCELAR DESDE PANTALLA EDITAR ******************//

$("#btnCancelCategories").addEventListener("click", () => {
  $categories.classList.remove("hidden");
  $containerCategories.classList.add("hidden");
});

//*************************** EVENTO PARA EDITAR CATEGORIA *************************//

$("#btnEditCategories").addEventListener("click", () => {
  if (categoryNameInput.value === "") {
    alert("Debe completar los campos");
  } else {
    const id = $btnEditCategories.getAttribute("data-id");
    const categories = editCategory(id);

    setDataToLocalStorage(LS_KEYS.categories, categories);

    CategoriesGenerateTable();
    CategoriesGenerateFilter();
    $categories.classList.remove("hidden");
    $containerCategories.classList.add("hidden");
  }
});

//  * ========================================================================================================================
//  *
//  * ========================================================================================================================
//  *
//  * ========================================================================================================================

// //////////////////////////////// BLOQUE BALANCE ///////////////////////////////////

//*********************** FUNCION QUE FILTRA Y ACUMULA GANANCIAS **************************/

const earningsBalance = () => {
  const operations = getDataFromLocalStorage(LS_KEYS.operations);
  let acumulatedEarnings = 0;
  $("#earnings").innerText = acumulatedEarnings;
  for (const { amount, type } of operations) {
    if (type === "ganancia") {
      acumulatedEarnings += parseInt(amount);
    }
    $("#earnings").innerText = acumulatedEarnings;
  }
  return acumulatedEarnings;
};

// //**************** FUNCION QUE FILTRA Y ACUMULA GASTOS *************************/

const spendingBalance = () => {
  let acumulatedSpent = 0;
  $("#expenses").innerText = acumulatedSpent;
  const operations = getDataFromLocalStorage(LS_KEYS.operations);

  for (const { amount, type } of operations) {
    if (type !== "ganancia") {
      acumulatedSpent -= parseInt(amount);
    }

    $("#expenses").innerText = acumulatedSpent;
  }
  return acumulatedSpent;
};

// //********************* FUNCION QUE CALCULA EL TOTAL ******************/

const totalBalance = () => {
  const acumulatedEarnings = earningsBalance();
  const acumulatedSpent = spendingBalance();
  let acumulated = acumulatedEarnings + acumulatedSpent;
  $("#total").innerText = acumulated;
  return acumulated;
};


//////////////////////////////////// BLOQUE FILTROS //////////////////////////////////////

const filtersType = $("#filtersType");
const $filterFirstCalendar = $("#filterFirstCalendar");
const $filtersCategory = $("#filtersCategory");
const $filtersSortBy = $("#filtersSortBy");
const $btnHideFilters = $("#btnHideFilters");
const $btnShowFilters = $("#btnShowFilters");
const $filters = $("#filters");
const calendar = $("#calendar");

//********************* FUNCIONES PARA OCULTAR Y MOSTRAR FILTROS *************************/

$("#btnHideFilters").addEventListener("click", () => {
  $filters.classList.add("hidden");
  $btnHideFilters.classList.add("hidden");
  $btnShowFilters.classList.remove("hidden");
});

$("#btnShowFilters").addEventListener("click", () => {
  $filters.classList.remove("hidden");
  $btnHideFilters.classList.remove("hidden");
  $btnShowFilters.classList.add("hidden");
});

// ************************ FUNCION QUE CREA FILTROS DE CATEGORIAS ********************//
const CategoriesGenerateFilter = () => {
  const categories = getDataFromLocalStorage(LS_KEYS.categories);

  $("#filtersCategory").innerHTML = `<option value="todas">todas</option>`;

  for (const { id, name } of categories) {
    $(
      "#filtersCategory"
    ).innerHTML += `<option  id='${id}' class="flex flex col">${name}</option>`;
  }
};

//***************************** FUNCIONES QUE FILTRAN POR TIPO ********************/

const filterByType = () => {
  const type = filtersType.value;
  const categoryName = $filtersCategory.value;
  const operations = getDataFromLocalStorage(LS_KEYS.operations);

  const operationsfiltered = operations.filter((operation) => {
    const operationMatchCategory = operation.category === categoryName;
    if (type === "todos") {
      return operationMatchCategory;
    } else {
      return operationMatchCategory && operation.type === type;
    }
  });

  return generateTable(operationsfiltered);
};

//************************** FUNCIONES QUE FILTRAN POR CATEGORIA Y TIPO ********************/

const filterByCategory = () => {
  const type = filtersType.value;
  const categoryName = $filtersCategory.value;
  const operations = getDataFromLocalStorage(LS_KEYS.operations);

  const operationsfiltered = operations.filter((operation) => {
    const filterDate = new Date($filterFirstCalendar.value).setHours(
      0,
      0,
      0,
      0
    );
    const operationDate = new Date(operation.calendar).setHours(0, 0, 0, 0);

    if (operationDate < filterDate) return false;

    const operationMatchCategory = operation.category === categoryName;
    const operationMatchtype = operation.type === type;
    const allTypes = type === "todos";
    const allCategories = categoryName === "todas";

    // Solo filtra por categoria
    if (allTypes && !allCategories) return operationMatchCategory;

    // Solo filtra por tipo
    if (!allTypes && allCategories) return operationMatchtype;

    // Filtra por ambos
    if (!allTypes && !allCategories)
      return operationMatchtype && operationMatchCategory;

    // No filtrar
    return allTypes && allCategories;
  });

  if (operationsfiltered.length === 0) {
    return showEmptyPage();
  } else {
    generateTable(operationsfiltered);
    return showTable();
  }
};


// ************** FUNCION ORDENAR POR ********//

const newDate = (sort) => {
  const date = new Date(sort.calendar);
  return date.getTime();
};

const FiltersResult = () => {
  const operations = getDataFromLocalStorage(LS_KEYS.operations);

  if ($filtersSortBy.value === "mostRecent") {
    let operation = operations.sort((a, b) => newDate(b) - newDate(a));

    return generateTable(operation);
  }

  if ($filtersSortBy.value === "lessRecent") {
    const operation = operations.sort((a, b) => newDate(a) - newDate(b));
    return generateTable(operation);
  }

  if ($filtersSortBy.value === "largestAmount") {
    const operation = operations.sort((a, b) => b.amount - a.amount);
    return generateTable(operation);
  }

  if ($filtersSortBy.value === "lesserAmount") {
    const operation = operations.sort((a, b) => a.amount - b.amount);
    return generateTable(operation);
  }

  if ($filtersSortBy.value === "aToZ") {
    const operation = operations.sort((a, b) => {
      if (a.description < b.description) {
        return -1;
      } else if (a.description > b.description) {
      } else {
        return 0;
      }
    });
    return generateTable(operation);
  }

  if ($filtersSortBy.value === "zToA") {
    const operation = operations.sort((a, b) => {
      if (a.description > b.description) {
        return -1;
      } else if (a.description < b.description) {
      } else {
        return 0;
      }
    });
    return generateTable(operation);
  }
};

///////////////////////////////////////// BLOQUE FECHA ///////////////////////////////////////////////

// ******************************************  FUNCION QUE SETEA LA FECHA ***********************//
const operationsFilters = getDataFromLocalStorage(LS_KEYS.operations);
const formatDate = (date) => {
  let month = date.getMonth() + 1;
  let day = date.getDate(); //obteniendo dia
  let year = date.getFullYear();

  if (day < 10) {
    day = "0" + day;
  } //agrega cero si el menor de 10
  if (month < 10) {
    month = "0" + month;
  }

  const result = year + "-" + month + "-" + day;

  return result;
};

const getToday = () => {
  const today = new Date();

  return formatDate(today);
};

// ************** FUNCION QUE SETEA LA FECHA EN EL PRIMER DÍA DEL MES Y LA DA VUELTA*********//

const getCurrentMonth = () => {
  let today = getToday().split("");

  today[today.length - 1] = 1;
  today[today.length - 2] = 0;

  return today.join("");
};

const reverseDate = (date) => {
  let finalDate = date.split("-").reverse().join("-");
  return finalDate;
};

// ************** FUNCION FILTROS DE FECHA *********//

const getTimeStamp = (date) => {
  return new Date(date).setHours(0, 0, 0, 0);
};

const onFilterByDate = () => {
  const value = $filterFirstCalendar.value;
  const operaciones = getDataFromLocalStorage(LS_KEYS.operations);

  const filterTimeStamp = getTimeStamp(value);

  const result = operaciones.filter(
    (op) => getTimeStamp(op.calendar) >= filterTimeStamp
  );

  generateTable(result);
};

//  * ========================================================================================================================
//  *
//  * ========================================================================================================================
//  *
//  * ========================================================================================================================


//////////////////////////////////// BLOQUE REPORTES ////////////////////////////

const emptyOperations = () => {
  const operations = getDataFromLocalStorage(LS_KEYS.operations);
  if (operations.length < 2) {
    showEmptyReports();
  }
};

//****************************** RESUMEN *******************/

// //************************** FUNCION QUE ACUMULA OPERACIONES  ******************/

const operations = getDataFromLocalStorage("operations")

const earningsOperations = []
const spendingOperations = []

const typeOperations = () => {
for (const operation of operations) {
  if (operation.type === "gasto") {
    spendingOperations.push(operation)

  } else {
    earningsOperations.push(operation)

  }
}
}
typeOperations()


//**************************** FUNCION CATEGORIA CON MAYOR GANANCIA  ************************/

const biggerEarnings = () => {

const arrayEarnings = Math.max(...earningsOperations.map(operation => operation.amount));

const arrayEarningsFilter = earningsOperations.filter(operation => parseInt(operation.amount) === arrayEarnings)

const arrayEarningsReports = arrayEarningsFilter.map(operation =>operation.category);

return arrayEarningsReports
}

const arrayEarningsReports = biggerEarnings()

const biggerEarningsAmount = () => {

  const arrayEarningsAmount = Math.max(...earningsOperations.map(operation => operation.amount));
  
  const arrayEarningsAmountFilter = earningsOperations.filter(operation => parseInt(operation.amount) === arrayEarningsAmount)

  const arrayEarningsAmountReport = arrayEarningsAmountFilter.map(operation =>operation.amount);

return arrayEarningsAmountReport
}

const arrayEarningsAmountReport = biggerEarningsAmount()


//************************* FUNCION CATEGORIA CON MAYOR GASTO  ************************/


const biggerSpent = () => {
const arraySpending = Math.max(...spendingOperations.map(operation => operation.amount));

const arraySpendingFilter = spendingOperations.filter(operation => parseInt(operation.amount) === arraySpending)

const arraySpendingReports = arraySpendingFilter.map(operation =>operation.category);

return arraySpendingReports
}
const arraySpendingReports = biggerSpent()

const biggerSpentAmount = () => {
  const arraySpendingAmount = Math.max(...spendingOperations.map(operation => operation.amount));
  
  const arraySpendingAmountFiltered = spendingOperations.filter(operation => parseInt(operation.amount) === arraySpendingAmount)
  
  const arraySpendingsAmountReport = arraySpendingAmountFiltered.map(operation =>operation.amount);

 return arraySpendingsAmountReport
}

const arraySpendingsAmountReport = biggerSpentAmount()

//*********************************** MES CON MAYOR BALANCE  ************************/
const biggerBalance = () => {

    const arrayBalance = Math.max(...earningsOperations.map(operation => operation.amount));

    const arrayBalanceFiltered = earningsOperations.filter(operation => parseInt(operation.amount) === arrayBalance)

    const arrayBalanceReports = arrayBalanceFiltered.map(operation =>operation.category);

return arrayBalanceReports
}

const arrayBalanceReports = biggerBalance()


const biggerBalanceAmount = () => {

  const arrayBalanceAmount = Math.max(...earningsOperations.map(operation => operation.amount));
  
  const arrayBalanceAmountFiltered = earningsOperations.filter(operation => parseInt(operation.amount) === arrayBalanceAmount)

  const arrayBalanceFilteredAmount = arrayBalanceAmountFiltered.map(operation =>operation.amount);

return arrayBalanceFilteredAmount
}

const arrayBalanceFilteredAmount = biggerBalanceAmount()

//******************************************* MES CON MAYOR GANANCIA  ************************/


const biggerDate = () => {

  const arrayDate = Math.max(...earningsOperations.map(operation => operation.amount));
  
  const arrayDateFiltered = earningsOperations.filter(operation => parseInt(operation.amount) === arrayDate)

  const arrayDateReports = arrayDateFiltered.map(operation =>operation.calendar);

  return arrayDateReports
}

const arrayDateReports = biggerDate()

const biggerDateAmount = () => {

const arrayDateAmount = Math.max(...earningsOperations.map(operation => operation.amount));
  
const arrayDateAmountFiltered = earningsOperations.filter(operation => parseInt(operation.amount) === arrayDateAmount)

const arrayDateFilteredAmount =   arrayDateAmountFiltered.map(operation =>operation.amount);

  return arrayDateFilteredAmount
   
  }

  const arrayDateFilteredAmount = biggerDateAmount()




//******************************************* MES CON MAYOR GASTO  ************************/
const biggerDateSpending = () => {
  const arrayDateSpending = Math.max(...spendingOperations.map(operation => operation.amount));
  
  const arrayDateSpendingFiltered = spendingOperations.filter(operation => parseInt(operation.amount) === arrayDateSpending)

  const arrayDateSpeReports = arrayDateSpendingFiltered.map(operation =>operation.calendar);
;

  return arrayDateSpeReports
}

const arrayDateSpeReports = biggerDateSpending()

const biggerDateSpendingAmount = () => {

  const arrayDateSpendingAmount = Math.max(...spendingOperations.map(operation => operation.amount));
  
  const arrayDateSpendingAmountFiltered = spendingOperations.filter(operation => parseInt(operation.amount) === arrayDateSpendingAmount)

  const arrayDateSpendingFilteredAmount =   arrayDateSpendingAmountFiltered.map(operation =>operation.amount);

  return arrayDateSpendingFilteredAmount
  }

 const arrayDateSpendingFilteredAmount = biggerDateSpendingAmount()


            //******************************* TABLA RESUMEN **************************************

const generateReportsTable = () => {

  $("#tableSummaryReports").innerHTML += `


  
    
      
 
    
              <tr class="text-center text-base">
                  <td class="items-center mr-16 md:mr-0 bg-[#f3e5f5] text-[#ba68c8] rounded">Categoria con mayor ganancia</td>
                  <td>${arrayEarningsReports}</td>
                  <td class="  text-lg text-green-600" >+$${arrayEarningsAmountReport}</td>
              </tr>         
      
              <tr class="text-center text-base">
                  <td class="items-center mr-16 md:mr-0 bg-[#f3e5f5] text-[#ba68c8] rounded">Categoria con mayor gasto</td>
                  <td>${arraySpendingReports}</td>
                  <td class="  text-lg text-red-600">-$${arraySpendingsAmountReport}</td>
                 
              </tr>       
              
              <tr class="text-center text-base">
                <td class="items-center mr-16 md:mr-0 bg-[#f3e5f5] text-[#ba68c8] rounded">Categoria con mayor balance</td>
                <td>${arrayBalanceReports}</td>
                <td class="  text-lg text-red-600">-$${arrayBalanceFilteredAmount}</td>
                 
              </tr>  
              
              <tr class="text-center text-base">
                <td class="items-center mr-16 md:mr-0 bg-[#f3e5f5] text-[#ba68c8] rounded">Mes con mayor ganancia</td>
                <td>${arrayDateReports}</td>
                <td class=" text-lg text-red-600">-$${arrayDateFilteredAmount}</td>
            
              </tr>   

              <tr class="text-center text-base">
              <td class="items-center mr-16 md:mr-0 bg-[#f3e5f5] text-[#ba68c8] rounded">Mes con mayor gasto</td>
              <td>${arrayDateSpeReports}</td>
              <td class=" text-lg text-red-600">-$${arrayDateSpendingFilteredAmount}</td>
          
            </tr>  
      
       </table>


  `
}

//****************************** TOTALES POR CATEGORIA *******************/

const totalsByCategory = () => {
  const operations = getDataFromLocalStorage(LS_KEYS.operations);

  const totales = operations.reduce((acc, operation) => {
    const group = acc[operation.category] || {
      category: operation.category,
      spending: 0,
      gain: 0,
      balance: 0,
    };

    if (operation.type === "gasto") {
      group.spending += parseInt(operation.amount);
    } else {
      group.gain += parseInt(operation.amount);
    }

    group.balance = group.gain - group.spending;

    acc[operation.category] = group;
    return acc;
  }, {});

  return Object.values(totales);
};

//********************  TABLA TOTALES POR CATEGORIA  ******************************

const reportsGenerateTable = () => {
  const reportesPorCategoria = totalsByCategory();
  const elements = reportesPorCategoria.map((reporte) => {
    const { category, spending, gain, balance } = reporte;

    return `
    <tr class="text-center text-base">
       <td class="category">
         <span class="items-center mr-16 md:mr-0 bg-[#f3e5f5] text-[#ba68c8] rounded">
           ${category}
         </span>
       </td>
       <td class="ganancia text-green-600">+${gain}</td>
       <td class="gasto text-lg text-red-600">-${spending}</td>
       <td class="gasto text-lg ">${balance}</td>
     </tr>
   `;
});

$("#categoryTableReports").innerHTML = elements.join("");

}



//****************************** TOTALES POR MES *******************/
const obtenerTotalesPorMes = () => {
  const operations = getDataFromLocalStorage(LS_KEYS.operations);

  const totales = operations.reduce((acc, operation) => {
    const [year, month] = operation.calendar.split("-");
    const date = `${month}/${year}`;

    const group = acc[date] || {
      date: date,
      spending: 0,
      gain: 0,
      balance: 0,
    };

    if (operation.type === "gasto") {
      group.spending += parseInt(operation.amount);
    } else {
      group.gain += parseInt(operation.amount);
    }

    group.balance = group.gain - group.spending;

    acc[date] = group;
    return acc;
  }, {});

  return Object.values(totales);
};

//********************  TABLA TOTALES POR MES  ******************************
const reportsDateGenerateTable = () => {
  const reportesPorMes = obtenerTotalesPorMes();
  const elements = reportesPorMes.map((reporte) => {
    const { date, spending, gain, balance } = reporte;

    return `
              <tr class="text-center">
                  <tr class="text-center text-base">
                  <td>${date}</td>
                  <td class="ganancia text-green-600">+${gain}</td>
                  <td class="gasto text-lg text-red-600">-${spending}</td>
                  <td class="gasto text-lg ">${balance}</td>
              </tr> 
            `;
  });

  $("#tableMonthReports").innerHTML = elements.join("");
};

/////////////////////////////////////// BLOQUE RESPONSIVE //////////////////////////////////

const $navBurguer = $("#navBurguer");
const $burguerMobile = $("#burguerMobile");
const $crussMobile = $("#crussMobile");

const $mobileBalance = $("#mobileBalance");
const $mobileCategory = $("#mobileCategory");
const $mobileReports = $("#mobileReports");
const imageReports = $("#imageReports");

const $categoriesTable = $("#categoriesTable");

//***************************** EVENTO PARA NAV MOBILE ********************************//

$("#burguerMobile").addEventListener("click", () => {
  $navBurguer.classList.remove("hidden");
  $crussMobile.classList.remove("hidden");
  $burguerMobile.classList.add("hidden");
});

$("#crussMobile").addEventListener("click", () => {
  $navBurguer.classList.add("hidden");
  $burguerMobile.classList.remove("hidden");
  $crussMobile.classList.add("hidden");
});

$mobileBalance.addEventListener("click", () => {
  balance.classList.remove("hidden");
  containerImage.classList.remove("hidden");
  addNewOperation.classList.add("hidden");
  $formEDit.classList.add("hidden");
  categories.classList.add("hidden");
  $containerCategories.classList.add("hidden");
  reports.classList.add("hidden");
  $containerCategories.classList.add("hidden");
});

$mobileCategory.addEventListener("click", () => {
  balance.classList.add("hidden");
  containerImage.classList.add("hidden");
  reports.classList.add("hidden");
  imageReports.classList.add("hidden");
  categories.classList.remove("hidden");
  $containerCategories.classList.add("hidden");
});

$mobileReports.addEventListener("click", () => {
  balance.classList.add("hidden");
  containerImage.classList.add("hidden");
  categories.classList.add("hidden");
  $containerCategories.classList.add("hidden");
  reports.classList.remove("hidden");
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
  $filterFirstCalendar.value = getCurrentMonth();

  earningsBalance();
  spendingBalance();
  totalBalance();
  generatorID();
  CategoriesGenerateTable();
  CategoriesGenerateFilter();
});

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

