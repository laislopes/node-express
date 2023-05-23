import NotFoundError from "../errors/NotFoundError.js";

function notFoundManager(req, res, next){
  const notFoundError = new NotFoundError();
  next(notFoundError);
}

export default notFoundManager;