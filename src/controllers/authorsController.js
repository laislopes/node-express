import { authors } from "../models/index.js";
import NotFoundError from "../errors/NotFoundError.js";

class AuthorController{

  static getAll = async (_, res, next) => {
    try{
      const authorsResult = await authors.find(); 

      res.status(200).json(authorsResult);
    }catch(error){
      next(error);
    }
  };

  static getById = async (req, res, next) =>{
    try{
      const {id} = req.params;
      const author = await authors.findById(id);

      if(author !== null){
        res.status(200).send(author);
      }else{
        next(new NotFoundError(`Author ${id} was not found`));
      }

    }catch(error){
      next(error);
    }
  };
    
  static add = async (req, res, next) => { 
    try {
      let author = new authors(req.body);

      await author.save();

      res.status(201).send(author.toJSON());
    } catch (error) {
      next(error);
    }

  };

  static update = async (req, res, next) => {
    try {
      const {id} = req.params;

      const authorResult = await authors.findByIdAndUpdate(id, {$set: req.body});
      
      if(authorResult !== null){
        res.status(200).send({message: `The author ${id} has been updated successfully!`});
      }else{
        next(new NotFoundError(`Author ${id} was not found`));
      }
    } catch (error) {
      next(error);
    }

   
  };

  static delete = async (req, res, next) =>{
    try {
      const {id} = req.params;

      const authorResult = await authors.findByIdAndDelete(id);

      if(authorResult !== null){
        res.status(200).send({message: `The author ${id} has been deleted successfully!`});
      }else{
        next(new NotFoundError(`Author ${id} was not found`));
      }
    } catch (error) {
      next(error);
    }

  };
}

export default AuthorController;