import express from "express";
import AuthorController from "../controllers/authorsController.js";

const router = express.Router();

router
  .get("/authors", AuthorController.getAll)
  .get("/authors/:id", AuthorController.getById)
  .post("/authors", AuthorController.add)
  .put("/authors/:id", AuthorController.update)
  .delete("/authors/:id", AuthorController.delete);

export default router;