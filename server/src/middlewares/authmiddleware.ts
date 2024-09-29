import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET: string = "asjfblansfjklasj";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): Response | void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log(authHeader);
    return res.status(406).json({});
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(407).json({});
  }
};
