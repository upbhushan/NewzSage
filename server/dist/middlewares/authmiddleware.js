"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JWT_SECRET = "asjfblansfjklasj";
var authMiddleware = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log(authHeader);
        res.status(406).json({ error: 'Access denied. No token provided.' });
        return;
    }
    var token = authHeader.split(" ")[1];
    try {
        var decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user_id = decoded.user_id;
        next();
    }
    catch (err) {
        res.status(407).json({ error: 'Invalid token.' });
    }
};
exports.authMiddleware = authMiddleware;
