// ---------------------------------- API KEY ----------------------------------
require('dotenv').config()

// Setup empty JS object to act as endpoint for all routes
const projectData = {}


// Require Express to run server and routes
const express = require('express')
const port = process.env.PORT || 8000

// Start up an instance of app
const app = express()


// ----------------------- DEPENDENCIES ----------------------- 
const bodyParser = require('body-parser')


// ----------------------- MIDDLEWARE ----------------------- 
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    res.send(projectData)
    console.log(projectData)
    // res.send('this is a index route')
})


// POST
app.post('/newlog_1', (req, res) => {
    console.log('got a request');
    if (req.body) {
        console.log(req.body);
    } else {
        console.log('Request body is empty');
    }
    res.json({
        status: 'message added'
    });
});
    // projectData.data = req.body
    // console.log(projectData)



