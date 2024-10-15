import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET: string = "asjfblansfjklasj";

interface AuthenticatedRequest extends Request {
  user_id?: string;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log(authHeader);
    res.status(406).json({ error: 'Access denied. No token provided.' });
    return;
  }

  const token = authHeader.split(" ")[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { user_id: string };
    req.user_id = decoded.user_id;
    next();
  } catch (err) {
    res.status(407).json({ error: 'Invalid token.' });
  }
};