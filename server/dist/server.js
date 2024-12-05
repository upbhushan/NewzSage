"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const publisherRoute_1 = __importDefault(require("./routes/publisherRoute"));
const newsRoute_1 = __importDefault(require("./routes/newsRoute"));
const commentRoute_1 = __importDefault(require("./routes/commentRoute"));
const voteRoute_1 = __importDefault(require("./routes/voteRoute"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
(0, db_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use("/api/v1/user", userRoute_1.default);
app.use("/api/v1/publisher", publisherRoute_1.default);
app.use("/api/v1/news", newsRoute_1.default);
app.use("/api/v1/comment", commentRoute_1.default);
app.use("/api/v1/vote", voteRoute_1.default);
// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
