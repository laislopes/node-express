import { authors, books } from "../models/index.js";
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

  static filter = async (req, res, next) => {
    try {
      const filter = await this.proccessFilter(req.query);

      if(filter !== null){
        const booksResult = await books
          .find(filter)
          .populate("author");

        res.status(200).send(booksResult);
      } else{
        res.status(200).send([]);
      }
    } catch (error) {
      next(error);
    }
  };

  static proccessFilter = async(parameters) => {
    const { publishingCompany, title, minPages, maxPages, authorName } = parameters;
  
    let filter = {};
  
    if (publishingCompany) filter.publishingCompany = publishingCompany;
    if (title) filter.title = { $regex: title, $options: "i" };
  
    if (minPages || maxPages) filter.pagesQuantity = {};
  
    // gte = Greater Than or Equal 
    if (minPages) filter.pagesQuantity.$gte = minPages;
    // lte = Less Than or Equal
    if (maxPages) filter.pagesQuantity.$lte = maxPages;
  
    if (authorName) {
      const author = await authors.findOne({ name: authorName });
  
      if (author !== null) {
        filter.author = author._id;
      } else {
        filter = null;
      }
    }

    return filter;
  };
}

export default BookController;