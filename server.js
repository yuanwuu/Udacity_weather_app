// Setup empty JS object to act as endpoint for all routes
const projectData = {}


// Require Express to run server and routes
const express = require('express')
const port = 8000

// Start up an instance of app
const app = express()


// ----------------------- DEPENDENCIES ----------------------- 
const bodyParser = require('body-parser')


// ----------------------- MIDDLEWARE ----------------------- 
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));


// ------------------------------- Setup Server ------------------------------- 
app.listen(port, ()=> {
    console.log(`listening on port: ${port}`)
})



// ------------------------------- ROUTES (INDEX)------------------------------- 
// GET
app.get('/allentries',(req,res)=>{
    // res.send(projectData)
    // console.log(projectData)
    res.send('this is a index route')
})


// POST
const logDataArr = []
app.post('/newlog',(req,res)=>{
    console.log(req.body)
    logDataArr.push(req.body)
    res.json({
        status:'message added'
    })
    console.log(logDataArr)
})


