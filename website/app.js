// ---------------------------------- Global Variables ----------------------------------
const recentEntry = document.querySelector('.title')
const entry = document.querySelector('#entryHolder')
const zipCode = document.querySelector('.zip')
const city = document.querySelector('.city')
const log = {}





// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// ------------------------- zipcode weather lookup ------------------------- 
// zipCode.addEventListener('keypress',(e)=> {
//     if (e.key === 'Enter') {
//         zipGeo()
//         console.log(log)
//     } 
// })
async function zipGeo(){
    zipValue = document.getElementById('zip').value
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipValue}&key=AIzaSyAsAvP5ekckhPIUs_UMGVXKqbhgfxOEL00`
    try {
        const response = await fetch(url)
        const data = await response.json()
        const geoLocation = data.results[0].geometry.location
        const countyName = data.results[0].address_components[3].long_name
        const latitude = geoLocation.lat;
        const longitude = geoLocation.lng;

        weatherApi(latitude,longitude,countyName)
      

    } catch (error) {
      console.error(error)
    }
    
}


// --------------------------- city name weatehr lookup --------------------------- 
// city.addEventListener('keypress', (e) =>{
//   if(e.key === 'Enter') {
//       getCoordinates()
      
//     }
// } )


// async function getCoordinates() {
//     cityName = document.getElementById('city').value
//     const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=e8be7f22f9cf976d2364d9e56d2f0599`
//     try {
//       const response = await fetch(url)
//       const data = await response.json()
//       const lat = data[0].lat
//       const lon = data[0].lon

//       weatherApi(lat,lon)

//     } catch (error) {
//       console.error(error)
//     }
// }


// --------------------------- WEATHER API --------------------------- 
async function weatherApi(lat, lon, countyName) {
  const weatherApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=e8be7f22f9cf976d2364d9e56d2f0599`;

  try {
    const response = await fetch(weatherApiUrl);
    const data = await response.json();
    const temp = `${countyName}: ${data.current.temp}`
    log.temp = temp

  } catch (error) {
    console.error(error);
  }
  
}


// ----------------------------- ACTION ----------------------------- 
const generateButton = document.querySelector('#generate')
generateButton.addEventListener('click', async () => {
  zipGeo()
  const logValue = document.querySelector('.myInput').value
  console.log(logValue)
  if (logValue !== '') {
    log.date = newDate
    log.zip_code = zipValue
    log.message = logValue


  // ----------------------------- PKG TO MAKE REQUEST -----------------------------  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(log)
    };

    try {
      const response = await fetch('/newlog', options);
      const data = await response.json();
      // console.log(data); // Response from the server
    } catch (error) {
      console.error('Error:', error);
    }
  }
});



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
})