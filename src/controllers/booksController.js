import books from "../models/Book.js";

class BookController{

  static getAll = async (_, res, next) => {
    try {
      const booksResult = await books.find()
        .populate("author")
        .exec();

      res.status(200).json(booksResult);
    } catch (error) {
      next(error);
    }

  };

  static getById = async (req, res, next) =>{
    try {
      const {id} = req.params;

      const book = await books.findById(id)
        .populate("author", "name")
        .exec();

      if(book !== null){
        res.status(200).send(book);
      }else{
        res.status(404).send({message: "Book's Id was not found"});
      }
    } catch (error) {
      next(error);
    }
  };
    
  static add = async (req, res, next) => {
    try {
      let book = new books(req.body);

      await book.save();

      res.status(201).send(book.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      const {id} = req.params;

      await books.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).send({message: `The book ${id} has been updated successfully!`});
    } catch (error) {
      next(error);
    }
  };

  static delete = async (req, res, next) =>{
    try {
      const {id} = req.params;

      await books.findByIdAndDelete(id);

      res.status(200).send({message: `The book ${id} has been deleted successfully!`});
    } catch (error) {
      next(error);
    }
  };

  static getByPublishingCompany = async (req, res, next) => {
    try {

      const {publishingCompany} = req.query;

      const booksResult = await books.find({"publishingCompany" : publishingCompany}, {},);

      res.status(200).send(booksResult);
    } catch (error) {
      next(error);
    }
  };
}

export default BookController;