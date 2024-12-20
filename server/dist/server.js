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
// import publisher from "./routes/publisherRoute";
const newsRoute_1 = __importDefault(require("./routes/newsRoute"));
const commentRoute_1 = __importDefault(require("./routes/commentRoute"));
const voteRoute_1 = __importDefault(require("./routes/voteRoute"));
const db_1 = __importDefault(require("./db"));
const getallnews_1 = __importDefault(require("./routes/getallnews"));
const auth_1 = __importDefault(require("./routes/auth"));
// import userInfoRoute from "./routes/userInfoRoute";
// import serverless from 'serverless-http';
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: '*', // Frontend URL (adjust accordingly)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'], // Allow other methods as needed
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allow additional headers if required
    credentials: true, // If you're using cookies or sessions
}));
(0, db_1.default)().catch((error) => {
    console.error('Failed to connect to the database:', error);
    // Optionally, handle the error further if needed
});
// ** Global HEAD Middleware **
app.use((req, res, next) => {
    if (req.method === "HEAD") {
        res.status(200).end(); // Respond to HEAD requests without a body
    }
    else {
        next(); // Continue to other middleware/routes for non-HEAD requests
    }
});
app.get("/api", (req, res) => {
    res.send("API is running...");
});
app.use("/api/v1/user", userRoute_1.default);
app.use("/api/v1/details", auth_1.default);
// app.use("/api/v1/publisher", publisher);
app.use("/api/v1/all", getallnews_1.default);
app.use("/api/v1/news", newsRoute_1.default);
app.use("/api/v1/comment", commentRoute_1.default);
app.use("/api/v1/vote", voteRoute_1.default);
// Start the server if this file is run directly
if (require.main === module) {
    const port = process.env.PORT || 3000;
    if (!app.locals.server) {
        app.locals.server = app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}
// Export the app for testing or other usage
exports.default = (req, res) => {
    app(req, res);
};
