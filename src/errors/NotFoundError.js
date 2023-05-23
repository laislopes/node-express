import BaseError from "./BaseError.js";

class NotFoundError extends BaseError{
  constructor(message = "Page Not Found"){
    super(message, 404);
  }
}

export default NotFoundError;