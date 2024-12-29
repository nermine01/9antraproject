const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_secret_key";  // Replace with an environment variable in production

// Middleware to verify if the user is an admin
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];  // Extract token from "Bearer <token>"
  
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    req.user = decoded;  // Attach decoded user data to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token", error: err.message });
  }
};

module.exports = { verifyAdmin };
