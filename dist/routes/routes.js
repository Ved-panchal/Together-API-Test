"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homeController_1 = require("../controllers/homeController");
const router = (0, express_1.Router)();
// Define routes
router.get('/', homeController_1.homeController);
exports.default = router;
