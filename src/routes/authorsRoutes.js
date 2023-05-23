import express from "express";
import AuthorController from "../controllers/authorsController.js";
import pagination from "../middlewares/pagination.js";

const router = express.Router();

router
  .get("/authors", AuthorController.getAll, pagination)
  .get("/authors/:id", AuthorController.getById)
  .post("/authors", AuthorController.add)
  .put("/authors/:id", AuthorController.update)
  .delete("/authors/:id", AuthorController.delete);

export default router;