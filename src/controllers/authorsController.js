import authors from "../models/Author.js";

class AuthorController{

  static getAll = (_, res) => {
    authors.find((_, authors) =>{
      res.status(200).json(authors);
    });
  };

  static getById = (req, res) =>{
    const {id} = req.params;

    authors.findById(id, (error, author) =>{
      if(error){
        res.status(400).send({message: `${error.message} - Id ${id} was not found`});
      }else{
        res.status(200).send(author);
      }
    });
  };
    
  static add = (req, res) => {
    let author = new authors(req.body);

    author.save((error) => {

      if(error){
        res.status(500).send({message: `${error.message} - error to register a new author`});
      }else{
        res.status(201).send(author.toJSON());
      }
    });
  };

  static update = (req, res) => {
    const {id} = req.params;

    authors.findByIdAndUpdate(id, {$set: req.body}, (error) => {
      if(!error){
        res.status(200).send({message: `The author ${id} has been updated successfully!`});
      }else{
        res.status(500).send({message: error.message});
      }
    });
  };

  static delete = (req, res) =>{
    const {id} = req.params;

    authors.findByIdAndDelete(id, (error) => {
      if(!error){
        res.status(200).send({message: `The author ${id} has been deleted successfully!`});
      }else{
        res.status(500).send({message: error.message});
      }
    });
  };
}

export default AuthorController;