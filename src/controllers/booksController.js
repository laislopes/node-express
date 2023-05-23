import books from "../models/Book.js";

class BookController{

  static getAll = async (_, res) => {
    try {
      const booksResult = await books.find()
        .populate("author")
        .exec();

      res.status(200).json(booksResult);
    } catch (error) {
      res.status(500).json({message: `${error.message} - Internal Server Error`});
    }

  };

  static getById = async (req, res) =>{
    try {
      const {id} = req.params;

      const book = await books.findById(id)
        .populate("author", "name")
        .exec();

      res.status(200).send(book);
    } catch (error) {
      res.status(400).send({message: `${error.message} - Id ${id} was not found`});
    }
  };
    
  static add = async (req, res) => {
    try {
      let book = new books(req.body);

      await book.save();

      res.status(201).send(book.toJSON());
    } catch (error) {
      res.status(500).send({message: `${error.message} - error to register a new book`});
    }
  };

  static update = async (req, res) => {
    try {
      const {id} = req.params;

      await books.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).send({message: `The book ${id} has been updated successfully!`});
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  };

  static delete = async (req, res) =>{
    try {
      const {id} = req.params;

      await books.findByIdAndDelete(id);

      res.status(200).send({message: `The book ${id} has been deleted successfully!`});
    } catch (error) {
      res.status(500).send({message: error.message});
    }
  };

  static getByPublishingCompany = async (req, res) => {
    try {

      const {publishingCompany} = req.query;

      const booksResult = await books.find({"publishingCompany" : publishingCompany}, {},);

      res.status(200).send(booksResult);
    } catch (error) {
      res.status(500).json({message: `${error.message} - Internal Server Error`});
    }
  };
}

export default BookController;