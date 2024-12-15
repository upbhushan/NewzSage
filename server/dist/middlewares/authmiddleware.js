"use strict";
// authAndPublisherMiddleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "asjfblansfjklasj"; // Should be in .env
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("Authorization header missing or malformed:", authHeader);
        res.status(401).json({ error: "Authorization header missing or malformed." });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
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
    }
    catch (error) {
        console.log("JWT Verification Error:", error);
        res.status(403).json({ error: "Invalid token." });
    }
};
exports.authMiddleware = authMiddleware;
