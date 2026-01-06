const express = require("express");
const dotenv = require("dotenv");
const DBConnect = require("./config/connectDB");
dotenv.config();
const cors = require("cors");
const initRoutes = require("./routes/index.route");

const PORT = process.env.PORT || 3000;
DBConnect();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);
app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
