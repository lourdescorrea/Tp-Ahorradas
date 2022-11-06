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

 lsopp = getDataFromLocalStorage(operations)

  const description = $("#description").value;
  const category = $("#category").value;
  const amount = $("#amount").value;
  const type = $("#type").value;
  const calendar = $("#calendar").value;
  const id = lsopp.length + 1;

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
  const localstorageoperationsdelet = JSON.parse(localStorage.getItem(operations));
  localstorageoperationsdelet.map((operation) => {
    const { id, description, category, type, amount, calendar } = operation;
    $("#table").innerHTML += `
      
             <tr> 
                  <td>${description}</td>
                  <td>${category}</td>
                  <td>${calendar}</td>
                  <td>${amount}</td>
                  <td><button  id="btnEditTableElement" onclick="operationEdit(${id})">editar</button></td>
                  <td><button  id="btnDeleteTableElement" onclick="operationDelet(${id})">eliminar</button></td>
                 
             </tr>
         
          `;
  });
};

// funcion que ubica id del objeto
const findOperation = (id) => {
  return getDataFromLocalStorage(operations).find((operation) => operation.id === parseInt(id));
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
  $("#editDescription").value = chosenOperation.description;
  $("#editCategory").value = chosenOperation.category;
  $("#editAmount").value = chosenOperation.amount;
  $("#editType").value = chosenOperation.type;
  $("#editCalendar").value = chosenOperation.calendar;

  $btnEditAdd.setAttribute("data-id", id);
};

//funcion y evento que cancela desde el boton cancelar del form editar operacion
const removeOperation = (id) => {
  const localstorageoperationsdelet = JSON.parse(localStorage.getItem(operations));

  return localstorageoperationsdelet.filter((operation) => operation.id !== parseInt(id));
};

const operationDelet = (id) => {
  const $btnDeleteTableElement = $("#btnDeleteTableElement");
  $btnDeleteTableElement.setAttribute("data-id", id);
  const operationId = $btnDeleteTableElement.getAttribute("data-id");
  $formEDit.classList.add("hidden");
  $tableOperations.classList.remove("hidden");
  generateTable(removeOperation(operationId));
  removeLocalStorageOperation(operations)
  recargarBalanceInicial(operations)
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
  
    if (operation.id === parseInt(id)) {
     
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

  generateTable(editOperation(operationId));
  localStorageEditOperations(operations)
});

// function/evento que agrega la tabla de nueva operacion a pantalla principal
$btnNewAdd.addEventListener("click", () => {
  const operations = getOperations()
  operations.push(newOperation());
  generateTable(operations);
  cleanPage();
  $tableOperations.classList.remove("hidden");
  balance.classList.remove("hidden");
  addNewOperation.classList.add("hidden");
  containerImage.classList.remove("hidden");
  textOperations.classList.add("hidden");
  addOperation(operations)
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

//********************************* FUNCIONES STORAGE OPERATIONS *************/
// if (!localStorage.getItem("operations")) {
//   localStorage.setItem("operations", JSON.stringify([]));
// }

const getDataFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};


const sendDataToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};


const addOperation = () => {
  let operationsLocalStorage = JSON.parse(localStorage.getItem("operations"));
  operationsLocalStorage.push(newOperation());
  sendDataToLocalStorage("operations", operationsLocalStorage);
}; 

const localStorageEditOperations = () => {
  let operationsLocalStorage = JSON.parse(localStorage.getItem("operations"));
  operationsLocalStorage.push(saveOperationData());

  sendDataToLocalStorage("operations", operationsLocalStorage);
};    

const removeLocalStorageOperation = (ops) => {
  sendDataToLocalStorage("operations", ops);
}; 

const recargarBalanceInicial = () => {
  const operationsfromLocalStorage = JSON.parse(localStorage.getItem("operations"))
  if (operationsfromLocalStorage === []) {
    containerImage.classList.remove("hidden");
    img.classList.remove("hidden");
    textOperations.classList.remove("hidden");
  } else {
    $tableOperations.classList.remove("hidden");
    img.classList.add("hidden");
    textOperations.classList.add("hidden");
  }
};

const setinicialdata = () => {
  const operations = getOperationsFromLocalsTORAGE()
  if (!localStorage.getItem("operations")) {
    localStorage.setItem("operations", JSON.stringify([]));
    $tableOperations.classList.add("hidden");
    img.classList.remove("hidden")
    containerImage.classList.remove("hidden")
  } else {
    let operationsLocalStorage = JSON.parse(localStorage.getItem("operations"));
    generateTable(operationsLocalStorage)
    $tableOperations.classList.remove("hidden");
    img.classList.add("hidden")
  }
}

setinicialdata()




// //*********************************************** WORKING ON CATEGORIES SECTION********************** */
// const $containerCategories = $("#containerCategories")
// const $categories = $("#categories")
// const $btnEditCategories =$("#btnEditCategories") 

// let categories = [
//     {
//       id: 0,
//       name: "Comida",
//     },
//     {
//       id: 1,
//       name: "Servicios",
//     },
//     {
//         id: 2,
//         name: "Salidas",
//       },
//       {
//         id: 3,
//         name: "Educacion",
//       },
//       {
//         id: 4,
//         name: "Transporte",
//       },
//       {
//         id: 5,
//         name: "Trabajo",
//       },
//   ];
 
// //*************************** FUNCIONES CREAR TABLA CATEGORIES *******************************************//

// const categoriesInfo = () =>{
//     const categoriesInput = $("#categoriesInput").value
//     return{
//         id: categories.length + 1,
//         name: categoriesInput
//     }
// }
// //************************ FUNCION QUE CREA Y PUSHE LA TABLA *****************************************//
// const CategoriesGenerateTable = () => {
//     $("#table").innerHTML = "";
//     categories.map(category => {
//         const {id, name} = category
//         $("#table").innerHTML +=  ` 
//             <tr>
//             <td>${name}</td>
//             <td><button id="btnEditCategories" onclick="categoryEdit(${id})">Editar</button></td>
//             <td> <button id="btnCancelCategories" onclick="categoryDelet(${id})">Eliminar</button></td>
//             </tr>          
//         `
//     })
// }

// //************************ FUNCION QUE UBICA EL ID DEL OBJETO *****************************************//

// const findCategory = (id) => {
//     return categories.find((category) => category.id === parseInt(id));
//   };
  
// //************************ FUNCION QUE DEJA VACIO EL HTML *****************************************//
//   const cleanPage = () => categories.classList.add("hidden");

//   //************************ FUNCION QUE EDITA *****************************************//
  
//   const categoryEdit = (id) => {
//     $categories.classList.add("hidden");
//     $containerCategories.classList.remove("hidden");
//     const chosenOperation = findCategory(id);
//     $("#name").value = chosenOperation.name;   
//     $btnEditCategories.setAttribute("data-id" , id)
     
//   };
  

//   //************************ FUNCION QUE ELIMINA *****************************************//


//   const removeCategories = (id) => {
//     return categories.filter((category) => category.id !== parseInt(id));
//   };
  
//   const categoryDelet = (id) => {
//     
//     const $btnCancelCategories = $("#btnCancelCategories");
//     $btnCancelCategories.setAttribute("data-id", id);
//     const operationId = $btnCancelCategories.getAttribute("data-id");
//     $categories.classList.remove("hidden");
//     $containerCategories.classList.add("hidden");


//     categories = removeCategories(operationId)
//     generateTable();
//   };


// //*************************** EVENTO QUE CONECTA BOTON AGREGAR CON TABLA ***************************************//
// $("#btnCategoryAdd").addEventListener("click", () => {
//     categories.push(categoriesInfo())
//     generateTable()
//     addOperation(categories)   
// })


// //*************************** FUNCIONES LOCAL STORAGE *******************************************//

//  if (!localStorage.getItem("categories")) {
//     localStorage.setItem("categories", JSON.stringify([]));
//   }
  
//   //funcion que te trae info desde el localstorage y lo conviene en objeto
//   const getDataFromLocalStorage = (key) => {
//     return JSON.parse(localStorage.getItem(key));
//   };
  
// //le paso el parametro a la funcion
//   getDataFromLocalStorage("categories");
  
// //funcion que envia la informacion a local stogre convirtiendola en string
//   const sendDataToLocalStorage = (key, data) => {
//     localStorage.setItem(key, JSON.stringify(data));
//   };
  
//   const addOperation = () => {
//     // Pido el array de operaciones
//     let operationsLocalStorage = JSON.parse(localStorage.getItem("categories"));
//     // Meto la operacion nueva al array
//     operationsLocalStorage.push(categoriesInfo());
//     operationsLocalStorage.push(categories);
//     // Envio el array modificado
//     sendDataToLocalStorage("categories", operationsLocalStorage);
//   };    