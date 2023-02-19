const express = require("express");
var bodyParser = require("body-parser");
//database
const database = require("./database");

//initialise express
const booky = express();
booky.use(bodyParser.urlencoded({extended: true}))


/*
route        /
description  get all the books
access       public
parameter    none
methods      get 
*/
booky.get("/",(req,res) => {
    return res.json({books: database.books});
});

/*
route        /is
description  get specific book on isbn
access       public
parameter    isbn
methods      get 
*/

booky.get("/is/:isbn",(req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn 
    );

    if(getSpecificBook.length === 0){
        return res.json({error: `NO Book found for the ISBN of ${req.params.isbn}`});
    }

    return res.json({books :getSpecificBook})
});

/*
route        /l
description  get specific book on language
access       public
parameter    language
methods      get 
*/

booky.get("/l/:language",(req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language === req.params.language 
    );

    if(getSpecificBook.length === 0){
        return res.json({error: `NO Book found for the language of ${req.params.language}`});
    }

    return res.json({books :getSpecificBook})
});

/*
route        /c
description  get specific book on catogries
access       public
parameter    category
methods      get 
*/

booky.get("/c/:category",(req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    );

    if(getSpecificBook.length === 0){
        return res.json({error: `NO book found for the category of ${req.params.category}`})
    }

    return res.json({book: getSpecificBook})
});


/*
route        /author
description  get all the authors
access       public
parameter    none
methods      get 
*/

booky.get("/author", (req,res) => {
    return res.json({authors: database.author});
});


/*
route        /author/book
description  get all the authors based on book
access       public
parameter    isbn
methods      get 
*/

booky.get("/author/book/:isbn",(req,res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.book.includes(req.params.isbn)
    );
    if(getSpecificAuthor.length === 0){
        return res.json({error: `no author found for the book of ${req.params.isbn}`})
    }

    return res.json({author: getSpecificAuthor})
});

/*
route        /author/b
description  get all the authors based on book
access       public
parameter    id
methods      get 
*/


booky.get("/author/b/:ID",(req,res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.id === req.params.ID
    );

    if(getSpecificAuthor.length === 0){
        return res.json({error: `NO Author found for the ID of ${req.params.ID}`});
    }

    return res.json({author: getSpecificAuthor})
});

/*
route        /publications
description  get all the publications
access       public
parameter    none
methods      get 
*/

booky.get("/publications",(req,res) => {
    return res.json({publications: database.publication});
});

/*
route        /publications/p
description  get specific publications by id
access       public
parameter    none
methods      get 
*/

booky.get("/publications/pub/:id",(req,res) => {
    const getSpecificPub = database.publication.filter(
        (publications) => publications.id === req.params.id 
    );

    if(getSpecificPub.length === 0){
        return res.json({error: `NO Book publication found for the ID of ${req.params.id}`});
    }

    return res.json({publication :getSpecificPub})
});

/*
route        /author/book
description  get all the publications based on book
access       public
parameter    isbn
methods      get 
*/

booky.get("/publications/book/:book",(req,res) => {
    const getSpecificPub = database.publication.filter(
        (publication) => publication.book.includes(req.params.book)
    );
    if(getSpecificPub.length === 0){
        return res.json({error: `no publication found for the book of ${req.params.book}`})
    }

    return res.json({pub: getSpecificPub})
});

//POST

/*
route        /book/new
description  add new book
access       public
parameter    none
methods      POST 
*/

booky.post("/book/new",(req,res) => {
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({updatedbook: database.books});
});

/*
route        /author/new
description  add new author
access       public
parameter    none
methods      POST 
*/

booky.post("/author/new",(req,res) => {
    const newAuthor = req.body;
    database.author.push(newAuthor);
    return res.json(database.author);
});

/*
route        /publication/new
description  add new publication
access       public
parameter    none
methods      POST 
*/

booky.post("/publication/new",(req,res) => {
    const newPub = req.body;
    database.publication.push(newPub);
    return res.json(database.publication);
});

//PUT 

/*
route        /publication/update/book
description  update or add new publication
access       public
parameter    ISBN
methods      PUT
*/

booky.put("/publication/update/book/:isbn,",(req,res) => {
    //update the publication database
    database.publication.forEach((pub) => {
        if(pub.id === req.body.pubID) {
            return pub.book.push(req.params.isbn);
        }
    });
    //update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            book.publication = req.body.pubID;
            return;
        }
    });

    return req.json(
        {
        books: database.books,
        publications: database.publication,
        message: "succssefully updated publication"
        }
        );

});

//DELETE

/*
route        /book/delete
description  delete a book
access       public
parameter    isbn
methods      DELETE
*/

booky.delete("/book/delete/:isbn",(req,res) => {
    //whichever book does not match with isbn ,just send it to updated databasebook 
    //and rest will be filtered out

    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    );
    database.books = updatedBookDatabase;

    return res.json({books: database.books});
});

/*
route        /book/delete/author
description  delete a author from  book and vice cersa
access       public
parameter    isbn,authorID
methods      DELETE
*/

booky.delete("/book/delete/author/:isbn/:authorID",(req,res) => {
// update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.author.filter(
                (eachAuthor) => eachAuthor !== parseInt(req.params.authorID)
            );

            book.author = newAuthorList;
            return;
        }
    });


//updtate the author database
    database.author.forEach((eachAuthor)=>{
        if(eachAuthor.id === parseInt(req.params.authorID)) {
            const newBookLIst = eachAuthor.book.filter(
                (book) => book !== req.params.isbn
            );
            eachAuthor.book = newBookLIst;
            return;
        }
    });
    return res.json ({
        book: database.books,
        author: database.author,
        message: "all authors were delted"
    });
});

booky.listen(3000,() => {
    console.log("server is up and runnig");
});