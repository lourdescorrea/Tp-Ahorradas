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

  //*********************************** SETTEAR ARRAY DE OBJETOS VACIO EN LOCAL STORAGE ******************/

  if (!localStorage.getItem("operations")) {
    localStorage.setItem("operations", JSON.stringify([]));
  }
  //***************************  FUNCION QUE RECIBE DATOS DEL FORM Y RETORNA OBJETO ********************************/

  const newOperation = () => {

    const description = $("#description").value;
    const category = $("#category").value;
    const amount = $("#amount").value;
    const type = $("#type").value;
    const calendar = $("#calendar").value;
    const id = getDataFromLocalStorage("operations").length + 1;
  
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
    $("#table").innerHTML = "";
    getDataFromLocalStorage("operations").map(operation => {
      const { id, description, category, type, amount, calendar } = operation;
      const typeEarnins = type === 'Ganancia'? "green-600"  : "red-600"
      const typeSpent = type === 'Ganancia'? "+"  : "-"
      $("#table").innerHTML += `
        
               <tr> 
                    <td >${description}</td>
                    <td>${category}</td>
                    <td>${calendar}</td>
                    <td class="mt-0 pt-0 pl-12 text-lg text-${typeEarnins} font-bold">${typeSpent}${amount}</td>
                    <td><button  id="btnEditTableElement" onclick="operationEdit(${id})">editar</button></td>
                    <td><button  id="btnDeleteTableElement" data-id="${id}" onclick="operationDelet(${id})">eliminar</button></td>
                   
               </tr>
           
            `;
    });
  };

  //***************************  FUNCION QUE ENCUENTRA OPERACION POR ID ****************************/

  const findOperation = (id) => {
    let operations = getDataFromLocalStorage("operations")
    return operations.find((operation) => operation.id === parseInt(id));
  };

  //***************************  FUNCION QUE ESCONDE LA IMG ****************************/
  const cleanPage = () => img.classList.add("hidden");

//***************************  FUNCION QUE TRAE FORMULARIO DE EDITAR  ****************************/

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


//***************************  FUNCION QUE REMUEVE OBJETO  ****************************/
const removeOperation = (id) => {
    let operations = getDataFromLocalStorage("operations")
    return operations.filter((operation) => operation.id !== parseInt(id));
  };

  const operationDelet = (id) => {
    $formEDit.classList.add("hidden");
    $tableOperations.classList.remove("hidden");
    
    const $btnDeleteTableElement = $("#btnDeleteTableElement");
   
    const operationId = $btnDeleteTableElement.getAttribute("data-id");
    
    generateTable(removeOperation(operationId));
    setDataToLocalStorage("opertions", (removeOperation(operations)))

  };

//***************************  FUNCION QUE PARA ALMACENAR LAS MODIFICACIONES  ****************************/


const saveOperationData = (id) => {
    const idLs = getDataFromLocalStorage("operations").length+1
    return {
      id: idLs,
      description: $("#editDescription").value,
      category: $("#editCategory").value,
      amount: $("#editAmount").value,
      type: $("#editType").value,
      calendar: $("#editCalendar").value,
    };
  };

  //***************************  FUNCION QUE PARA EDITAR OPERACION  ****************************/

  const editOperation = (id) => {

    let operations = getDataFromLocalStorage("operations")
    
    return operations.map((operation) => {
    
      if (operation.id === parseInt(id)) {
       
        return saveOperationData(id);
      }
      return operation;
    });
  };