import books from "../models/Book.js";

class BookController{

  static getAll = (_, res) => {
    books.find()
      .populate("author")
      .exec((_, books) =>{
        res.status(200).json(books);
      });
  };

  static getById = (req, res) =>{
    const {id} = req.params;

    books.findById(id)
      .populate("author", "name")

      .exec((error, book) =>{
        if(error){
          res.status(400).send({message: `${error.message} - Id ${id} was not found`});
        }else{
          res.status(200).send(book);
        }
      });
  };
    
  static add = (req, res) => {
    let book = new books(req.body);

    book.save((error) => {

      if(error){
        res.status(500).send({message: `${error.message} - error to register a new book`});
      }else{
        res.status(201).send(book.toJSON());
      }
    });
  };

  static update = (req, res) => {
    const {id} = req.params;

    books.findByIdAndUpdate(id, {$set: req.body}, (error) => {
      if(!error){
        res.status(200).send({message: `The book ${id} has been updated successfully!`});
      }else{
        res.status(500).send({message: error.message});
      }
    });
  };

  static delete = (req, res) =>{
    const {id} = req.params;

    books.findByIdAndDelete(id, (error) => {
      if(!error){
        res.status(200).send({message: `The book ${id} has been deleted successfully!`});
      }else{
        res.status(500).send({message: error.message});
      }
    });
  };

  static getByPublishingCompany = (req, res) => {
    const {publishingCompany} = req.query;

    books.find({"publishingCompany" : publishingCompany}, {}, (error, books) => {
      res.status(200).send(books);
    });
  };
}

export default BookController;