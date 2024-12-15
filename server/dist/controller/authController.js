"use strict";
// controllers/authController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = void 0;
const User_1 = __importDefault(require("../models/User"));
const mongoose_1 = __importDefault(require("mongoose"));
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id; // Assuming you've set req.user in auth middleware
    if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Invalid user ID' });
        return;
    }
    try {
        const user = yield User_1.default.findById(userId)
            .select('-password_hash') // Exclude password_hash for security
            .populate('credibility'); // Populate referenced fields if necessary
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            isPublisher: user.isPublisher,
            credibility_score: user.credibility_score,
            status: user.status,
            email_verified: user.email_verified,
            created_at: user.created_at,
            updated_at: user.updated_at,
            last_login: user.last_login,
            government_id: user.government_id,
            avatar_id: user.avatar_id,
            credibility: user.credibility, // Adjust based on your schema
        });
    }
    catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getUserInfo = getUserInfo;
