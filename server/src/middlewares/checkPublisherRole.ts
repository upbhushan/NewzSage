// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "asjfblansfjklasj";

// interface AuthRequest extends Request {
//   user?: {
//     username: string;
//     user_id: string;
//     isPublisher: boolean;
//   };
// }

// export const checkPublisherRole = (req: AuthRequest, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;
  
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     res.status(401).json({ error: "Authorization header missing." });
//     return;
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as { 
//       user_id: string;
//       username: string;
//       isPublisher: boolean 
//     };

//     if (!decoded.isPublisher) {
//       res.status(403).json({ error: "Access denied. Not a publisher." });
//       return;
//     }

//     req.user = {
//       user_id: decoded.user_id,
//       username: decoded.username,
//       isPublisher: decoded.isPublisher
//     };
    
//     next();
//   } catch (error) {
//     res.status(401).json({ error: "Invalid token." });
//   }
// };