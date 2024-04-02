require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/task");
const userRoutes = require("./routes/user");

const app = express();
app.use(cors({
  origin: ["https://app-client-coral.vercel.app"],
  methods: ["POST", "GET", "PATCH", "DELETE"],
  credentials: true
}));
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/tasks", taskRoutes);
app.use("/api/user", userRoutes);
app.get("/",(req, res)=>{
  res.send('backend');
})

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to db and lisening on: http://localhost:" + process.env.PORT
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
