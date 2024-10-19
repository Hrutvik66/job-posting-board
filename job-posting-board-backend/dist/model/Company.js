"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var companySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    company_name: {
        type: String,
        required: true,
    },
    company_email: {
        type: String,
        required: true,
    },
    employee_size: {
        type: String,
        required: true,
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "upated_at" } });
var companyModel = mongoose_1.default.model("companyModel", companySchema);
exports.default = companyModel;
