const API_URL = "https://mindhub-xj03.onrender.com/api/amazing"
let dataArray;
async function getDataFromApi() {
await fetch(`${API_URL}`)
    .then(respuesta => respuesta.json())
    .then(json => dataApi = json)
dataArray = dataApi.events


let cardDate = dataApi.currentDate
let arrayPast = dataArray.filter(e => cardDate > e.date)
let arrayFuture = dataArray.filter(e => cardDate < e.date)



let porcentajes = []
arrayPast.map(eventos => {
    porcentajes.push({
    eventos: eventos.name,
      porAssistance: (eventos.assistance * 100 / eventos.capacity).toFixed(2)
    })
})
let MAX = porcentajes.sort((a, b) => b.porAssistance - a.porAssistance)[0]

let MIN = porcentajes.sort((a, b) => a.porAssistance - b.porAssistance)[0]

let capacity = dataArray.filter(e => e.capacity).sort((a, b) => b.capacity - a.capacity)[0]


const categoryAssistFuture = arrayFuture.map(eventos => eventos.category)
const categorySetFuture = new Set(categoryAssistFuture)
const categorysFuture = [...categorySetFuture]


const categoryValueFuture = [] 
categorysFuture.map(category =>
    categoryValueFuture.push({
    category: category,
    evento: arrayFuture.filter(evento => evento.category === category), 
    }))


let estimateAndCapacityFuture = [] 
categoryValueFuture.map(datos => {
    estimateAndCapacityFuture.push({
    category: datos.category,
    estimate: datos.evento.map(item => item.estimate),
    capacity: datos.evento.map(item => item.capacity),
      estimateRevenue: datos.evento.map(item => item.estimate * item.price)
    })
})


estimateAndCapacityFuture.forEach(category => {
    let totalEstimate = 0
    category.estimate.forEach(estimate => totalEstimate += Number(estimate))
    category.estimate = totalEstimate

    let totalCapacityFut = 0
    category.capacity.forEach(capacity => totalCapacityFut += Number(capacity)) 
    category.capacity = totalCapacityFut

    let totalEstimateRevenue = 0
    category.estimateRevenue.forEach(estimateRevenue => totalEstimateRevenue += Number(estimateRevenue)) 
    category.estimateRevenue = totalEstimateRevenue

    category.porcentajeAttendace = ((totalEstimate * 100) / totalCapacityFut).toFixed(2) 
})

const categoryAssit = arrayPast.map(eventos => eventos.category) 
const categorySet = new Set(categoryAssit) 
const categorys = [...categorySet] 
console.log(categorys)

const categoryValue = []
categorys.map(category =>
    categoryValue.push({
    category: category,
    evento: arrayPast.filter(evento => evento.category === category), 
    })
)



let assistAndCapacityPast = [] 
categoryValue.map(datos => {
    assistAndCapacityPast.push({
    category: datos.category,
    assistance: datos.evento.map(item => item.assistance),
    capacity: datos.evento.map(item => item.capacity),
      revenue: datos.evento.map(item => item.assistance * item.price)
    })
})



assistAndCapacityPast.forEach(category => {
    let totalAssit = 0
    category.assistance.forEach(assistance => totalAssit += Number(assistance))
    category.assistance = totalAssit

    let totalCapacity = 0
    category.capacity.forEach(capacity => totalCapacity += Number(capacity)) 
    category.capacity = totalCapacity

    let totalRevenue = 0
    category.revenue.forEach(revenue => totalRevenue += Number(revenue)) 
    category.revenue = totalRevenue

    category.porcentaje = ((totalAssit * 100) / totalCapacity).toFixed(2)
})


function PrintTableOne() {
    let contenedorUno = `<td scope="row">${MAX.eventos}: ${MAX.porAssistance}%</td>
                        <td>${MIN.eventos}: ${MIN.porAssistance}%</td>
                        <td>${capacity.name}: ${capacity.capacity}</td>`
    document.getElementById("tableEventStatistics").innerHTML = contenedorUno
}
PrintTableOne()

function PrintTableTwo() {
    let contenedorDos = `<tr>
    <td scope="row">
    Categories
    </td>
    <td>Estimated</td>
    <td>Percentage of estimated attendance</td>
</tr>`
    estimateAndCapacityFuture.forEach(e => {
    e.estimateAndCapacityFuture
    contenedorDos += `<tr>
    <td>${e.category}</td>
    <td>$${e.estimateRevenue}</td>
    <td>${e.porcentajeAttendace}%</td>
</tr>`
    })
    document.getElementById("tableUpcoming").innerHTML = contenedorDos
}
PrintTableTwo()

function PrintTableThree() {
    let contenedorTres = `<tr>
    <td scope="row">
    Categories
    </td>
    <td>Revenue</td>
    <td>Percentage of attendance</td>
</tr>`
    assistAndCapacityPast.forEach(e => {
    e.assistAndCapacityPast
    contenedorTres += `<tr>
    <td>${e.category}</td>
    <td>$${e.revenue}</td>
    <td>${e.porcentaje}%</td>
</tr>`
    })
    document.getElementById("tablePast").innerHTML = contenedorTres
}
PrintTableThree()


}
getDataFromApi()