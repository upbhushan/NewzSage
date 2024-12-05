import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET: string = "asjfblansfjklasj";

interface AuthenticatedRequest extends Request {
  body: {
    publisher_id?: string;
  };
}

export const publisherMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const publisherHeader = req.headers.pubauthorization;
  console.log('Received body:', req.body);


  if (!publisherHeader || typeof publisherHeader !== 'string' || !publisherHeader.startsWith("Bearer ")) {
    res.status(406).json({ error: 'Access denied. No token provided.' });
    return;
  }

  const token = publisherHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { publisher_id: string };
    req.body.publisher_id = decoded.publisher_id; // Assign to request body
    next();
  } catch (err) {
    res.status(407).json({ error: 'Invalid token.' });
  }
};
