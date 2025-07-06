import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.config";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "object" && "id" in decoded && "email" in decoded) {
      req.user = {
        id: (decoded as JwtPayload).id,
        email: (decoded as JwtPayload).email,
      };
      next();
    } else {
      res.status(403).json({ message: "Invalid token payload" });
    }
  } catch (err) {
    res.status(403).json({ message: "Token verification failed" });
  }
};
