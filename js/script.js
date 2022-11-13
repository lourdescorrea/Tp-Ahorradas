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
  const amount = $("#amount").value;
  const type = $("#type").value;
  const category = $("#newOperationCategories").value;
  const calendar = formatfinaldate();

  return {
    id,
    description,
    category,
    type,
    amount,
    calendar,
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
                <td>${category}</td>
                <td class="collapse md:visible">${calendar}</td>
                <td class="text-lg text-right text-${textClass} font-bold">${symbol}${amount}</td>
                
                <td>
                <span class="flex justify-center p-2">
                 <button class="m-2  rounded hover:bg-indigo-400" id="btnEditTableElement" onclick="operationEdit('${id}')">editar</button>
                 <button  class=" m-2 rounded hover:bg-indigo-400" id="btnDeleteTableElement" data-id='${id}' onclick="operationDelet('${id}')">eliminar</button>
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

//***************************  FUNCION QUE ESCONDE  ****************************/

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
    editType.value === "" ||
    editCategory.value === ""
  ) {
    return false;
  } else {
    return true;
  }
};

// ******************************* FUNCION QUE CREA CATEGORIAS EN FORM DE NUEVA OP ********************//

const CategoriesGenerateNewOperation = () => {
  const categories = getDataFromLocalStorage(LS_KEYS.categories);
  for (const { id, name } of categories) {
    $(
      "#newOperationCategories"
    ).innerHTML += `<option  id='${id}'   class="flex flex col">${name}</option>`;
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
  newDate();
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

////////////////////////////////////// BLOQUE FUNCIONES BASE CATEGORIAS //////////////////////////////////////////

const $containerCategories = $("#containerCategories");
const $categories = $("#categories");
const $btnEditCategories = $("#btnEditCategories");
const CATEGORIES_BASE = [
  {
    id: generadorID(),
    name: "comida",
  },
  {
    id: generadorID(),
    name: "servicios",
  },
  {
    id: generadorID(),
    name: "salidas",
  },
  {
    id: generadorID(),
    name: "educación",
  },
  {
    id: generadorID(),
    name: "transporte",
  },
  {
    id: generadorID(),
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
                       <span class="tag bg-[#e1bee7] text-[#ba68c8]">${name}</span>
                     </td>
                     <td class="flex justify-center p-2"> 
                        <button class=" m-2 rounded hover:bg-[#ba68c8] hover:text-white " id="editCategories" onclick="categoryEdit('${id}')">Editar</button>
                     
                        <button class="  m-2  rounded hover:bg-[#ba68c8] hover:text-white " id="btnCancelCategories" onclick="categoryDelet('${id}')">Eliminar</button>
                     </td>
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
  CategoriesGenerateNewOperation();
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
  if (categoryNameInput.value !== "") {
    return true;
  } else {
    return false;
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
    CategoriesGenerateNewOperation();
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
  if (categoryNameInput.value === "") {
    alert("Debe completar los campos");
  } else {
    const id = $btnEditCategories.getAttribute("data-id");
    const categories = editCategory(id);

    setDataToLocalStorage(LS_KEYS.categories, categories);

    CategoriesGenerateTable();
    CategoriesGenerateNewOperation();
    $categories.classList.remove("hidden");
    $containerCategories.classList.add("hidden");
  }
});

//  * ========================================================================================================================
//  *
//  * ========================================================================================================================
//  *
//  * ========================================================================================================================

//////////////////////////////// BLOQUE BALANCE, FILTROS Y FECHA ////////////////////////////////////

// //////////////////////////////// BALANCE ///////////////////////////////////

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

//*************************** EVENTO PARA CARGA INICIAL *********************************//

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

////////////////////////////////////  FILTROS //////////////////////////////////////

const filterType = $("#filterType");
const $filterFirstCalendar = $("#filterFirstCalendar");
const $filtersCategory = $("#filtersCategory");
const $filtersSortBy = $("#filtersSortBy");
const $btnHideFilters = $("#btnHideFilters");
const $btnShowFilters = $("#btnShowFilters");
const $filters = $("#filters");
const calendar = $("#calendar");

// //********************************* FUNCION QUE CALCULA EL TOTAL ********************************/


////////////////////////////////////  FILTROS //////////////////////////////////////


//********************* FUNCIONES PARA OCULTAR Y MOSTRAR FILTROS ***************************/

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

// ******************************* FUNCION QUE CREA FILTROS DE CATEGORIAS ********************//
const CategoriesGenerateFilter = () => {
  const categories = getDataFromLocalStorage(LS_KEYS.categories);

  $("#filtersCategory").innerHTML = `<option value="todas">todas</option>`;

  for (const { id, name } of categories) {
    $(
      "#filtersCategory"
    ).innerHTML += `<option  id='${id}'   class="flex flex col">${name}</option>`;
  }
};

//***************************** FUNCIONES QUE FILTRAN POR TIPO ********************/

const selectFilter = () => {
  let filtersType = document.getElementById("filtersType");
  return filtersType.value;
};

const filterByType = () => {
  const type = selectFilter();
  const operations = getDataFromLocalStorage(LS_KEYS.operations);

  if (type === "todos") {
    return generateTable(operations);
  }

  const newOperations = operations.filter(
    (operation) => operation.type === type
  );
  console.log(">>>>>>>>>>>>>>>> filterbytype newOperations", newOperations);
  return generateTable(newOperations);
};


//***************************** FUNCIONES QUE FILTRAN POR CATEGORIA ********************/

const filterByCategory = () => {
  if (filtersType.value === "todos") {
    const categoryName = $filtersCategory.value;
    const operations = getDataFromLocalStorage(LS_KEYS.operations);
    const operationsfiltered = operations.filter(
      (operation) => operation.category === categoryName
    );
    console.log(">>>>>> operationsfiltered", operationsfiltered);
    return generateTable(operationsfiltered);
  }

  if (filtersType.value === "gasto") {
    const categoryName = $filtersCategory.value;
    const operations = getDataFromLocalStorage(LS_KEYS.operations);
    const operationsCategoryFiltered = operations.filter(
      (operation) => operation.category === categoryName
    );
    const operationsTypeFilteres = operationsCategoryFiltered.filter(
      (operation) => operation.type === filtersType.value
    );
    console.log(">>>> filtro gasto", operationsTypeFilteres);
    return generateTable(operationsTypeFilteres);
  }

  if (filtersType.value === "ganancia") {
    const categoryName = $filtersCategory.value;
    const operations = getDataFromLocalStorage(LS_KEYS.operations);
    const operationsCategoryEarning = operations.filter(
      (operation) => operation.category === categoryName
    );
    const operationsFilteredEarnings = operationsCategoryEarning.filter(
      (operation) => operation.type === filtersType.value
    );
    console.log(">>>> filtro ganancia", operationsFilteredEarnings);
    return generateTable(operationsFilteredEarnings);
  }
};

///////////////////////////////////////// BLOQUE FECHA ///////////////////////////////////////////////

// ******************************************  FUNCION QUE SETEA LA FECHA ***********************//

const newDate = () => {
  let newDate = new Date();
  let month = newDate.getMonth() + 1;
  let day = newDate.getDate(); //obteniendo dia
  let year = newDate.getFullYear();

  if (day < 10) {
    day = "0" + day;
  } //agrega cero si el menor de 10
  if (month < 10) {
    month = "0" + month;
  }
  return (calendar.value = year + "-" + month + "-" + day);
};

//Dar vuelta la fecha

// const correctDate = (date) => {
//   let formatDate = date.split("-").reverse().join("-");
//   return formatDate;
// };

// const date = correctDate(newDate())
// console.log(date)

// const filterFirstCalendar = document.getElementById('date');
// filterFirstCalendar.value = date;

// console.log("filterFirstCalendar value:", filterFirstCalendar.value)

// const setCalendar = () => {
//   let newdate = newDate()
//   console.log(newdate)
//   $filterFirstCalendar.valueAsDate = newdate
// }

// function PasarValor() {
//   document.getElementById("date").defauldValue ===
//     document.getElementById(newDate()).defauldValue;
// }

$("#navMobile").addEventListener("click", () => {
  $navBurguer.classList.remove("hidden");
});

$mobileBalance.addEventListener("click", () => {
  balance.classList.remove("hidden");
  containerImage.classList.remove("hidden");
  $categoryContent.classList.add("hidden");
  addNewOperation.classList.add("hidden");
  $formEDit.classList.add("hidden");
  categories.classList.add("hidden");
  $containerCategories.classList.add("hidden");
  reports.classList.add("hidden");
});

$mobileCategory.addEventListener("click", () => {
  categories.classList.remove("hidden");
  balance.classList.add("hidden");
  $containerCategories.classList.add("hidden");
  containerImage.classList.add("hidden");
  addNewOperation.classList.add("hidden");
  $formEDit.classList.add("hidden");
  reports.classList.add("hidden");
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
  newDate();
  CategoriesGenerateFilter();
});

/*///////////////////////////
 *
 */ ///////////////////////////
/*
 */ /////////////////
