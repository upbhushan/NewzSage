"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/hello", (req, res) => {
    res.send("Hello World!");
});
exports.default = router;
