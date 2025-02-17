const express = require('express');
const router = express.Router();

// books array where book data is stored
const books = [
    {
        id: 1,
        title: "Where the Wild Things Are",
        author: "Maurice Sendak",
        imageUrl: "/wildthings.jpg",
        year: 1963
    },
    {
        id: 2,
        title: "The Very Hungry Caterpillar",
        author: "Eric Carle",
        imageUrl: "/HungryCatepillar.jpg",
        year: 1969
    },
    {
        id: 3,
        title: "Goodnight Moon",
        author: "Margaret Wise Brown",
        imageUrl: "/goodnight-moon-jpg",
        year: 1947
    },
];

// middleware to find a book by ID
function findBookByID(req, res, next) {

    // convert the id from req params to a number
    const requestedId = Number(req.params.id);

    // find the book with the matching id
    const bookData = books.find((book) => {
        return book.id === requestedId;
    });

    // if the book is found, attach the book data to the request object and call tne next middleware or route handler using next()
    if (bookData !== undefined) {
        req.book = bookData;
        next();
    } else {

        // if not found, send a 404 response
        res.status(404).send("book not found")
    }

}

// route to get all books
router.get('/books', (req, res) => res.send(books));

// route to get a book by ID
// use the middleware to find the book and respond with its details
router.get('/books/:id', findBookByID, (req, res) => res.send(req.book));

// route to create a new book
router.post('/books', (req, res) => {
    //get the book data from the request body
    const book = req.body;

    //assign a new ID to the book 
    book.id = books.length + 1;

    //add the new book to the array
    books.push(book);

    //respond with the newly created book and a 201 status code
    res.status(201).send(book);
});

// route to delete a book by ID
router.delete('/books/:id', findBookByID, (req, res) => {
    //find the index of the book in the array
    const index = books.findIndex(book => book.id === req.book.id);

    // remove the book from the array
    books.splice(index, 1);

    // send a 204 status code to confirm deletion
    res.status(204).send("book removed");
})

// route to update a book by ID
router.put('/books/:id', findBookByID, (req, res) => {
    // extracts the updated book details from the request body
    const { title, author, imageUrl, year } = req.body;

    //gets the book found by the middleware
    const book = req.book;

    // update the details
    book.title = title;
    book.author = author;
    book.imageUrl = imageUrl;
    book.year = year;

    //send back the updated book
    res.send(book);
})

//export the router to be used on the app 
module.exports = router;