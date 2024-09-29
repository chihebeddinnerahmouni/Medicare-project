import { Request, Response, NextFunction } from "express";
declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

const idAuthGuard = async (req: Request, res: Response, next: NextFunction) => {
  try {
        const token = req.headers.authorization;
        if (!token) return res.status(401).json({ message: "No token found" });
    req.user = token;
        next();
      }
    catch (e) {
    res.status(401).json({ message: "id auth gard error", error: e });
  }
};

export default idAuthGuard;
