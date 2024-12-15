import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controller/todoController.js";
const router = express();

router.post("/create", createTodo);
router.get("/fetch", getTodos);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
