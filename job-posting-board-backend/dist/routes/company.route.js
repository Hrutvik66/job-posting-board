"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// company controller
var company_controller_1 = __importDefault(require("../controller/company.controller"));
var auth_middleware_1 = require("../middleware/auth.middleware");
var companyRouter = (0, express_1.Router)();
// register company route
companyRouter.post("/register", company_controller_1.default.registerCompany);
// login company route
companyRouter.post("/login", company_controller_1.default.loginCompany);
// get company routes
companyRouter.get("/", auth_middleware_1.auth, company_controller_1.default.getCompanyById);
exports.default = companyRouter;
