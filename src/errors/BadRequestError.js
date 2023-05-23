import BaseError from "./BaseError.js";

class BadRequestError extends BaseError{
  constructor(message = "The provided data is not valid"){
    super(message, 400);
  }
}

export default BadRequestError;