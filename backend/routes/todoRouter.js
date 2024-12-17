import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controller/todoController.js";
import { authenticate } from "../middleware/authorize.js";
const router = express();

router.post("/create", authenticate, createTodo);
router.get("/fetch", authenticate, getTodos);
router.put("/update/:id", authenticate, updateTodo);
router.delete("/delete/:id", authenticate, deleteTodo);

export default router;
