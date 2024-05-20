const express = require("express")
const bodyParser = require ("body-parser");
const cors = require("cors"); 
const app = express(); 
const port = 3000; 

// where we will keep books
let books = []; 

app.use(cors()); 

// config body parser middleware
app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json()); 

app.post("/book", (req, res) => {
	//add the received book to our book array
	const book = req.body; 
	
	console.log(book); 
	books.push(book); 

	res.send(`Book is added to the database`); 
});

app.listen(port, ()=> console.log(`Hello world app listening on port`))