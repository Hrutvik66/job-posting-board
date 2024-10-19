"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// controller
var job_controller_1 = __importDefault(require("../controller/job.controller"));
var jobRouter = (0, express_1.Router)();
// create job route
jobRouter.post("/", job_controller_1.default.createJob);
// get all jobs of specified company route
jobRouter.get("/company/:_id", job_controller_1.default.getAllJobsOfCompany);
exports.default = jobRouter;
