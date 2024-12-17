import Todo from "../models/todoModel.js";

export const createTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    user: req.user._id,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "todo created successfully", newTodo });
  } catch (error) {
    res.status(400).json({ message: "Error in todo creation" });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.status(201).json({ message: "todo fetch successfully", todos });
  } catch (error) {
    res.status(500).json({ message: "Error in fetching todos" });
  }
};

export const updateTodo = async (req, res) => {
  console.log("update");

  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);

    res.status(201).json({ message: "todo update successfully", todo });
  } catch (error) {
    res.status(400).json({ message: "Error in todo creation" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(201).json({ message: "todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in deleting todo" });
  }
};
