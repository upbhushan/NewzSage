import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET: string = "asjfblansfjklasj";

interface AuthenticatedRequest extends Request {
    publisher_id?: string;
}

export const publisherMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const publisherHeader = req.headers.pubauthorization;

    if (!publisherHeader || typeof publisherHeader !== 'string' || !publisherHeader.startsWith("Bearer ")) {
        console.log(publisherHeader);
        res.status(406).json({ error: 'Access denied. No token provided.' });
        return;
    }

    const token = publisherHeader.split(" ")[1];
    // console.log(token);
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { publisher_id: string };
      req.publisher_id = decoded.publisher_id;
      next();
    } catch (err) {
      res.status(407).json({ error: 'Invalid token.' });
    }
}