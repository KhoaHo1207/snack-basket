const authRoute = require("./auth.route");
const productRoute = require("./product.route");
const uploadRoute = require("./upload.route");
const initRoutes = (app) => {
  app.use("/api/auth", authRoute);
  app.use("/api/product", productRoute);
  app.use("/api/upload", uploadRoute);
};

module.exports = initRoutes;
