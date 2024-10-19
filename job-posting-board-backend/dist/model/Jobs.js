"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_2 = require("mongoose");
var jobSchema = new mongoose_2.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    experienceLevel: {
        type: String,
        required: true,
    },
    candidates: [
        {
            type: String
        },
    ],
    endDate: {
        type: Date,
        required: true,
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "upated_at" } });
var jobModel = mongoose_1.default.model('JobSchema', jobSchema);
exports.default = jobModel;
