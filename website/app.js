// ---------------------------------- Global Variables ----------------------------------
const recentEntry = document.querySelector('.title')
const entry = document.querySelector('#entryHolder')
const log = {}



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
log.date = newDate


// ------------------------- WEATHER API by ZIP ------------------------- 
const zipCoord = async () => {
    zip = document.getElementById('zip').value
   
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=e8be7f22f9cf976d2364d9e56d2f0599&units=imperial`

    try {
        const response = await fetch(url)
        const data = await response.json()
        const lon = data.coord.lon
        const lat = data.coord.lat
        const city = data.name
        const temp = data.main.temp

        log.city = `Current City: ${city}`
        log.temp = `Current Temp: ${temp}`

        await newData
    } catch (error) {
      console.error(error)
    }
    
}


// ----------------------------- ACTION ----------------------------- 
const generateButton = document.querySelector('#generate')
generateButton.addEventListener('click', async () => {
  generateButton.style.backgroundColor = 'salmon'
  generateButton.style.border = 'none'
  
  zipCoord()
  const msg = document.querySelector('.myInput').value
  if (msg !== '') {
    log.message = `How do I feel: ${msg}`
  } 
  

});



// ----------------------------- PKG TO SEND TO SERVER SIDE -----------------------------  
const newData = async(req,res) =>{
  const options = {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(log)
  }
  
  try {
    const response = await (fetch('/newlog_1',options))
    const data = response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

// ----------------------------- UPDATE UI -----------------------------
function loadEnteries() {
  const entryDate = document.getElementById('date')
  const entryTemp = document.getElementById('temp')
  const entryContent = document.getElementById('content')
  entryDate.innerHTML= newDate
  entryTemp.innerHTML = log.message
  entryContent.textContent = log.temp


}

recentEntry.addEventListener('click',(evt)=> {
   loadEnteries()
  //  recentEntry.style.color = 'red'
})

