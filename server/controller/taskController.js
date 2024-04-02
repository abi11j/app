const Task = require("../module/taskModule");
const mongoose = require("mongoose");

const getAll = async (req, res) => {
  const user_id = req.user._id;

  const tasks = await Task.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(tasks);
};

const getOne = async (req, res) => {
  const user_id = req.user._id;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "error" });
  }

  const task = await Task.find({ _id: id, user_id });

  if (!task) {
    return res.status(404).json({ error: "error" });
  }

  res.status(200).json(task);
};

const createTask = async (req, res) => {
  const { title, description } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!description) {
    emptyFields.push("load");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const task = await Task.create({ user_id, title, description });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (status === "OPEN") {
  } else if (status === "PROGRESS") {
  } else if (status === "FINISH") {
  } else {
    return res.status(404).json({ error: "error" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No workout" });
  }

  const task = await Task.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!task) {
    res.status(400).json({ error: "error" });
  }

  res.status(200).json({ task });
};

const deletTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "error" });
  }

  const task = await Task.findByIdAndDelete({ _id: id });

  if (!task) {
    res.status(400).json({ error: "error" });
  }

  res.status(200).json({ task });
};

const countTasks = async (req, res) => {
  const user_id = req.user._id;

  const openTasks = await Task.find({
    user_id,
    status: "OPEN",
  }).countDocuments();
  const progressTasks = await Task.find({
    user_id,
    status: "PROGRESS",
  }).countDocuments();
  const finishTasks = await Task.find({
    user_id,
    status: "FINISH",
  }).countDocuments();
  const totalTasks = openTasks + progressTasks + finishTasks;

  res.status(200).json({
    totalTasks: totalTasks,
    openTasks: openTasks,
    progressTasks: progressTasks,
    finishTasks: finishTasks,
  });
};

module.exports = {
  getAll,
  getOne,
  createTask,
  updateTask,
  deletTask,
  countTasks,
};
