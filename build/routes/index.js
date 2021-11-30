"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teacher_router_1 = __importDefault(require("./teacher.router"));
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).header('Content-Type', 'text/html').send(`<h4> Your Server is running</h4>`);
});
router.use('/teacher', teacher_router_1.default);
exports.default = router;
