"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const voteController_1 = require("../controller/voteController");
const authmiddleware_1 = require("../middlewares/authmiddleware");
const router = (0, express_1.Router)();
router.post('/', authmiddleware_1.authMiddleware, voteController_1.createVote);
exports.default = router;
