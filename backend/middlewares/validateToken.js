import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler((req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.statusCode = 401;
        throw new Error("User is not authorized");
      }

      req.user = decoded.user;
      next();
    });
  } else {
    res.statusCode = 401;
    throw new Error("User is not authorized or token is missing");
  }
});

export default validateToken;
