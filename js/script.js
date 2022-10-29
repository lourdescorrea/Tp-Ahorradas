const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


const operations = []

const newOperation = () => {
    const description = $("#description").value
    const category = $("#category").value
    const amount = $("#amount").value
    const type = $("#type").value
  
  

    return{
        description,
        category,
        type,
        amount
    }
}

const generateTable = () => {
    $("#table").innerHTML = ""

    operations.map(operation =>{
        const {description, category, type, amount} = operation
        $("#table").innerHTML += `

        <tr> 

                <td>${description}</td>
                <td>${category}</td>
                <td>${amount}</td>
                <td>${type}</td>
            </tr>
        `
    })
}


$("#btnNewOperation").addEventListener("click", () =>{
    operations.push(newOperation())
    generateTable()
    console.log(operations)
})
