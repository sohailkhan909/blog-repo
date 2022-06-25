const express = require("express");
const app = express();
app.use(express.json())

const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");


mongoose
  .connect("mongodb://localhost:27017/blog")
  .then((resolve) => {
    console.log("Blog Database Connected");
  })
  .catch((err) => {
    console.log("Database Failled");
  });

app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/post", postRoute)

app.get("/get", (req, res) => {
  console.log("get api");
});

const PORT = 7000;

app.listen(PORT, (err) => {
  if (err) {
    console.log("Server Failed" + err);
  } else {
    console.log("Backend is Running on port no. " + PORT);
  }
});
