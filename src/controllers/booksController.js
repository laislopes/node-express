import books from "../models/Book.js";

class BookController{

    static getAllBooks = (_, res) => {
        books.find((_, books) =>{
            res.status(200).json(books)
        });
    }
    
}

export default BookController;