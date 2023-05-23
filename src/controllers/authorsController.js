import authors from "../models/Author.js";

class AuthorController{

  static getAll = async (_, res) => {
    try{
      const authorsResult = await authors.find(); 

      res.status(200).json(authorsResult);
    }catch(error){
      res.status(500).json({message: `${error.message} - Internal Server Error`});
    }
  };

  static getById = async (req, res) =>{
    try{
      const {id} = req.params;

      const author = await authors.findById(id);

      res.status(200).send(author);
    }catch(error){
      res.status(400).send({message: `${error.message} - Book was not found`});
    }
    
  };
    
  static add = async (req, res) => { 
    try {
      let author = new authors(req.body);

      await author.save();

      res.status(201).send(author.toJSON());
    } catch (error) {
      res.status(500).send({message: `${error.message} - error to register a new author`});
    }

  };

  static update = async (req, res) => {
    try {
      const {id} = req.params;

      await authors.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).send({message: `The author ${id} has been updated successfully!`});
    } catch (error) {
      res.status(500).send({message: error.message});
    }

  };

  static delete = async (req, res) =>{
    try {
      const {id} = req.params;

      await authors.findByIdAndDelete(id);

      res.status(200).send({message: `The author ${id} has been deleted successfully!`});
    } catch (error) {
      res.status(500).send({message: error.message});
    }

  };
}

export default AuthorController;