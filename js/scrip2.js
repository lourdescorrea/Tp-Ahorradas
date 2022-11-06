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
                    <td><button  id="btnDeleteTableElement" onclick="operationDelet(${id})">eliminar</button></td>
                   
               </tr>
           
            `;
    });
  };