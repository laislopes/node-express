import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    id: {type: String},
    title: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "authors",required: true},
    publishingCompany: {
      type: String, 
      required: true,
      enum: {
        values: ["Kindle Direct Publishing", "Apple Books"],
        message: "The Publishing Company: {VALUE}, is not valid"
      }
    },
    pagesQuantity: {
      type: Number, 
      validate: {
        validator: (value) => {
          return value >= 10 && value <= 5000;
        },
        message: "The value should be between 10 and 5000. Provided value: {VALUE}"
      }
    }
  }
);

const books = mongoose.model("books", bookSchema);

export default books;