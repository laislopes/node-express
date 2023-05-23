import books from "../models/Book.js";
import NotFoundError from "../errors/NotFoundError.js";

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
        next(new NotFoundError(`Book ${id} was not found`));
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

      const bookResult = await books.findByIdAndUpdate(id, {$set: req.body});

      if(bookResult !== null){
        res.status(200).send({message: `The book ${id} has been updated successfully!`});
      }else{
        next(new NotFoundError(`Book ${id} was not found`));
      }

    } catch (error) {
      next(error);
    }
  };

  static delete = async (req, res, next) =>{
    try {
      const {id} = req.params;

      const bookResult = await books.findByIdAndDelete(id);

      if(bookResult !== null){
        res.status(200).send({message: `The book ${id} has been deleted successfully!`});
      }else{
        next(new NotFoundError(`Book ${id} was not found`));
      }

    } catch (error) {
      next(error);
    }
  };

  static getByPublishingCompany = async (req, res, next) => {
    try {

      const {publishingCompany} = req.query;

      const booksResult = await books.find({"publishingCompany" : publishingCompany}, {},);

      if(booksResult !== null){
        res.status(200).send(booksResult);
      }else{
        next(new NotFoundError(`Books with Publishing Company: ${publishingCompany}, were not found`));
      }
    } catch (error) {
      next(error);
    }
  };
}

export default BookController;