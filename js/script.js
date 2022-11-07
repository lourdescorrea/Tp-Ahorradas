

//********************************* FUNCIONES STORAGE OPERATIONS *************/
// if (!localStorage.getItem("operations")) {
//   localStorage.setItem("operations", JSON.stringify([]));
// }

 
 

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