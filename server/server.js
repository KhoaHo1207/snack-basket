const express = require("express");
const dotenv = require("dotenv");
const DBConnect = require("./config/connectDB");
dotenv.config();

const PORT = process.env.PORT || 3000;
DBConnect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
