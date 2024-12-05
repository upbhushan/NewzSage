// authAndPublisherMiddleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "asjfblansfjklasj"; // Should be in .env

interface AuthenticatedRequest extends Request {
  user?: {
    username: string;
    user_id: string;
    isPublisher: boolean;
    avatar_id?: string;
    author?: string;
  };
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Authorization header missing or malformed:", authHeader);
    res.status(401).json({ error: "Authorization header missing or malformed." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { 
      user_id: string;
      username: string;
      isPublisher: boolean;
      avatar_id?: string;
      author?: string;
    };

    console.log("Decoded JWT:", decoded); // Debug log

    // Check if username is present
    if (!decoded.username) {
      console.log("Username is missing in the token payload.");
      res.status(401).json({ error: "Invalid token payload: username missing." });
      return;
    }

    // Check if user is a publisher
    if (!decoded.isPublisher) {
      console.log(`User ${decoded.username} is not a publisher.`);
      res.status(403).json({ error: "Access denied. Not a publisher." });
      return;
    }

    // Assign user information to req.user
    req.user = {
      user_id: decoded.user_id,
      username: decoded.username,
      isPublisher: decoded.isPublisher,
      avatar_id: decoded.avatar_id,
      author: decoded.author,
    };

    next();
  } catch (error) {
    console.log("JWT Verification Error:", error);
    res.status(403).json({ error: "Invalid token." });
  }
};