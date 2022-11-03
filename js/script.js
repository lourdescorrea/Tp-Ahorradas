const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const $btnAddOperation = $("#btnAddOperation")
const $tableEditarEliminar = $("#tableEditarEliminar")
const $btnEditOperation = $("#btnEditOperation")
const $btnCancelateOperation = $("#btnCancelateOperation")
const $editarOperacion = $("#editarOperacion")


// seletores nav
const reports = $("#reports");
const categories = $("#categories");
const addNewOperation = $("#addNewOperation");
const balance = $("#balance");
const navBalance = $("#navBalance")
const navCategories = $("#navCategories")
const navReports = $("#navReports")
const total = $("#total");

// selector btn nueva nuevaOperacion
const btnNewOperation = $("#btnNewOperation");


 // funcion para btn nueva operacion

btnNewOperation.addEventListener("click", () => {
    balance.classList.add("hidden");
    addNewOperation.classList.remove("hidden");
  });

//   funcion esconder formularios desde el nav 

  navBalance.addEventListener("click", () => {
    balance.classList.remove("hidden");
    categories.classList.add("hidden");
    addNewOperation.classList.add("hidden");
    reports.classList.add("hidden");
  });
  
  navCategories.addEventListener("click", () => {
    categories.classList.remove("hidden");
    balance.classList.add("hidden");
    reports.classList.add("hidden");
    addNewOperation.classList.add("hidden");
  });
  
  navReports.addEventListener("click", () => {
    reports.classList.remove("hidden");
    balance.classList.add("hidden");
    categories.classList.add("hidden");
    addNewOperation.classList.add("hidden");
  });
  

// genera array de objetos con la informacion de cada operacion
let operations = []

const newOperation = () => {
    const description = $("#description").value
    const category = $("#category").value
    const amount = $("#amount").value
    const type = $("#type").value
    const calendar  = $("#calendar").value
    const id = operations.length + 1
    
    return{
        id,
        description,
        category,
        type,
        amount,
        calendar
    }
}

// genera tabla con el registro de operaciones
const generateTable = (operations) => {
    $("#table").innerHTML = ""
console.log(operations)
    operations.map(operation =>{
        const {id, description, category, type, amount, calendar} = operation
        $("#table").innerHTML += `
        <tr> 
                <td>${description}</td>
                <td>${category}</td>
                <td>${calendar}</td>
                <td>${amount}</td>
                <td><button id="btnEditTableElement" onclick="operationEdit(${id})">editar</button></td>
                <td><button id="btnDeleteTableElement">eliminar</button></td>
               
        </tr>
        `
    })
}

// funcion que ubica id del objeto
const findOperation = (id) => {
    return operations.find(product => product.id === parseInt(id))
}

//funcion que deja vacia la pagina para mostrar otra seccion
const cleanPage = () => IMAGEN.classList.add("hidden")

// funcion que trae form de edit con el objeto que el usuario completo en nueva operacion
const operationEdit = (id) => {
    cleanPage()
    $editarOperacion.classList.remove("hidden")
    $tableEditarEliminar.classList.add("hidden")
    const chosenOperation = findOperation(id)
    description.value = chosenOperation.description
    $("#category").value = chosenOperation.category
    $("#amount").value = chosenOperation.amount
    $("#type").value = chosenOperation.type
    $("#calendar").value = chosenOperation.calendar

    $btnEditOperation.setAttribute("data-id", id)
    $btnCancelateOperation.setAttribute("data-id", id)
}

//funcion y evento que cancela desde el boton cancelar del form editar operacion
const removeOperation = (id) => {
    return  operations.filter(operation => operation.id !== parseInt(id))
}

$btnCancelateOperation.addEventListener("click", () => {
    const operationId = $btnCancelateOperation.getAttribute("data-id")
    $editarOperacion.classList.add("hidden")
    $tableEditarEliminar.classList.remove("hidden")
    generateTable(removeOperation(operationId))
})
//funcion para almacenar modificaciones
const saveOperationData = (id) => {
 return {
        id: parseInt(id), 
        description: $("#editDescription").value,
        category: $("#editCategory").value,
        amount: $("#editAmount").value,
        type: $("#editType").value,
        calendar: $("#editCalendar").value
 }
}
// funcion para editar operacion previa
const editOperation = (id) => {
    return operations.map(operation => {
        console.log(operation.id, parseInt(id), id);
        if (operation.id === parseInt(id)){
            console.log("encontre el obj")
            return saveOperationData(id)
        }
        return operation
    })
}
// evento para editar y mostrar modificaciones del usuario sobre una operacion previa
$btnEditOperation.addEventListener("click", () => {
    const operationId = $btnEditOperation.getAttribute("data-id")
    $editarOperacion.classList.add("hidden")
    $tableEditarEliminar.classList.remove("hidden")
    console.log (typeof operationId)
    generateTable(editOperation(operationId))

})

//evento que pushea nueva operacion

$btnAddOperation.addEventListener("click", () =>{
    operations.push(newOperation())
    generateTable(operations) 
    cleanPage()
    $tableEditarEliminar.classList.remove("hidden")
    console.log(operations)
})



