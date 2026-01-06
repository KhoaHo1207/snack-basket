const authRoute = require("./auth.route");

const initRoutes = (app) => {
  app.use("/api/auth", authRoute);
};

module.exports = initRoutes;
