import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function errorsManager(error, req, res, next) {
  if(error instanceof mongoose.Error.CastError){
    res.status(400).send({message: "The provided data is not valid"});
  }else{
    res.status(500).send({message: "Internal Server Error"});
  }
}

export default errorsManager;