//import the express module
const express = require('express');


// import books router from the routes directory
const booksRouter = require("./routes/books");

//import the body-parse middleware to parse JSON bodies
const bodyParser = require("body-parser");

//create an instance of express application
const app = express();

//define the port number the server will listen on
const PORT = 3005;

//  Middleware to parse JSON bodies
app.use(bodyParser.json());

// serve static files from the public folder
app.use(express.static('public'));

//use the books router for /api routes
app.use("/api", booksRouter);


//handle non-existing routes
app.use((req, res) => {
    res.status(404).send('endpoint not found')
})

// start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`server is runnin at http://localhost:${PORT}`)
})