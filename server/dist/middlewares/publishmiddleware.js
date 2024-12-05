"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publisherMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "asjfblansfjklasj";
const publisherMiddleware = (req, res, next) => {
    const publisherHeader = req.headers.pubauthorization;
    if (!publisherHeader || typeof publisherHeader !== 'string' || !publisherHeader.startsWith("Bearer ")) {
        console.log(publisherHeader);
        res.status(406).json({ error: 'Access denied. No token provided.' });
        return;
    }
    const token = publisherHeader.split(" ")[1];
    // console.log(token);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.publisher_id = decoded.publisher_id;
        next();
    }
    catch (err) {
        res.status(407).json({ error: 'Invalid token.' });
    }
};
exports.publisherMiddleware = publisherMiddleware;
