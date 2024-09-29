import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token found" });

  try {
    jwt.verify(
      token,
      process.env.secret_key!,
      async (err: any, payload: any) => {
        if (err) {
          if (err.name === "TokenExpiredError")
            return res.status(401).json({ message: "token expires" });

          return res.status(401).json({ message: "Invalid token", error: err });
        }
        req.user = payload;
        next();
      }
    );
  } catch (e) {
    res.status(401).json({ message: "error", error: e });
  }
};

export default authGuard;

