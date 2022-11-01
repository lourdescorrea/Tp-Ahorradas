const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const agregarOperacion = $("#btnAddOperation")
const tableEditarEliminar = $("#tableEditarEliminar")

// genera array de objetos con la informacion de cada operacion
const operations = []

const newOperation = () => {
    const description = $("#description").value
    const category = $("#category").value
    const amount = $("#amount").value
    const type = $("#type").value
    const calendar  = $("#calendar").value
    const id = $("#id")
    
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
const generateTable = () => {
    $("#table").innerHTML = ""

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


const findOperation = (id) => {
    return operations.find(product => product.id === id)
}

const cleanPage = () => nuevaOperacion.innerHTML = ""

const operationEdit = (id) => {
    cleanPage()
    editarOperacion.classList.remove("hidden")
    const chosenOperation = findOperation(id)

}

//evento que pushea nueva operacion

$("#btnAddOperation").addEventListener("click", () =>{
    operations.push(newOperation())
    generateTable() 
    cleanPage()
    tableEditarEliminar.classList.remove("hidden")
    console.log(operations)
})
