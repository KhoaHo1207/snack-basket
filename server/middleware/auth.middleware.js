const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Protect route failed", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const checkRole = (req, res, next, roles) => {
  try {
    const { role } = req.user;
    if (!roles.includes(role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }
    next();
  } catch (error) {
    console.log("Check role failed", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
module.exports = { protectRoute, checkRole };
