const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

// where we will keep books
let books = [];

app.use(cors());

// config body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = books.find(book => book.isbn === isbn);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

app.delete("/book/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    books = books.filter(book => book.isbn !== isbn);
    res.send(`Book with ISBN ${isbn} is deleted`);
});

app.post("/book", (req, res) => {
    const book = req.body;
    console.log(book);
    books.push(book);
    res.send(`Book is added to the database`);
});

app.put('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const newBook = req.body;
    let bookIndex = books.findIndex(book => book.isbn === isbn);
    if (bookIndex !== -1) {
        books[bookIndex] = newBook;
        res.send('Book is edited');
    } else {
        res.status(404).send('Book not found');
    }
});

app.listen(port, () => {
    console.log(`Hello world app listening on port ${port}`);
});
