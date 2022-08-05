getData()

var checkboxSeleccionado = []
var textSearch = ""


var objetodatos;
async function getData() {
    await fetch("https://amazing-events.herokuapp.com/api/events")
    .then(response => response.json())
    .then(data => objetodatos = data);

var datos = objetodatos.events
var fecha = objetodatos.currentDate

var id = 1
datos.map(dato => dato.id = id++)

function displayCard(datosf){
    var templatehtml = ""

for( var i = 0; i<datosf.length; i++){

    if(fecha>datosf[i].date){
        templatehtml += `<div class="contenedor-de-la-card d-flex align-items-center m-4" style="width: 20rem; height: 25rem;">
        <div class="card-body d-flex flex-column justify-content-around">
        <div class="img-container align-center justify-content-center">
        <img src="${datosf[i].image}" class="imagenes" style="height: 19vh;" alt="...">
        </div>
        <h5 class="card-title">${datosf[i].name}</h5>
        <p>${datosf[i].date}</p>
        <p class="card-text">${datosf[i].description}</p>
        <div class="d-flex flex-row justify-content-around">
        <h5>Price: $${datosf[i].price}</h5>
        <a href="details.html?id=${datosf[i].id}" class="btn btn-primary">Details</a>
        </div>
        </div>
    </div>`
    }
    document.querySelector("#cards-past").innerHTML = templatehtml
}
}

function crearcheckbox(){
    var checkContainer = document.getElementById("checkbox-container") 
    var todaslascategorias = datos.map(eventos => eventos.category)
    const dataArray = new Set(todaslascategorias)
    var categorias = [...dataArray]
    var inputcheckbox = ""
    categorias.forEach(categorias => {
        inputcheckbox += `<div class="form-check">
                <input class="form-check-input" type="checkbox" value="${categorias}" id="${categorias}">
                <label class="form-check-label" for="${categorias}">
                ${categorias}
                </label>
            </div>` 
    })
    checkContainer.innerHTML = inputcheckbox
}
crearcheckbox()

var checkbox = document.querySelectorAll("input[type=checkbox]")
checkbox.forEach(check => check.addEventListener("click", (event)=>{
    var checked = event.target.checked
    if(checked){
        checkboxSeleccionado.push(event.target.value)
        arrayFiltrado()
    }
    else{
        checkboxSeleccionado = checkboxSeleccionado.filter(unchecked => unchecked !== event.target.value)
        arrayFiltrado()
    }
}))


var inputsearch = document.getElementById("search")
inputsearch.addEventListener("keyup", (event)=>{
    textSearch = event.target.value
    arrayFiltrado()
})


function arrayFiltrado() {
    let Data = []
    if(checkboxSeleccionado.length > 0 && textSearch !== ""){
        checkboxSeleccionado.map(categoria => {
            Data.push(...datos.filter(dato => dato.name.toLowerCase().includes(textSearch.trim().toLowerCase()) && dato.category == categoria))
        })
    }
    else if(checkboxSeleccionado.length > 0 && textSearch === ""){
        checkboxSeleccionado.map(categoria => Data.push(...datos.filter(dato => dato.category == categoria)))
    }
    else if(checkboxSeleccionado.length == 0 && textSearch !== ""){
        Data.push(...datos.filter(dato => dato.name.toLowerCase().includes(textSearch.trim().toLowerCase())))
    }
    else{Data.push(...datos)}

    displayCard(Data)

}
arrayFiltrado()
}