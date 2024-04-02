const express = require("express");
const {
  getAll,
  getOne,
  createTask,
  updateTask,
  deletTask,
  countTasks,
} = require("../controller/taskController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
router.use(requireAuth);

router.get("/", getAll);

router.get("/count", countTasks);

router.get("/:id", getOne);

router.post("/", createTask);

router.patch("/:id", updateTask);

router.delete("/:id", deletTask);

module.exports = router;
