"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// model
var Company_1 = __importDefault(require("../model/Company"));
// otpService
var otp_service_1 = __importDefault(require("../service/otp.service"));
// jwt
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyOtp = otp_service_1.default.verifyOtp;
var CompanyService = /** @class */ (function () {
    function CompanyService() {
        // create company
        this.SECRET_KEY = process.env.SECRET_KEY;
    }
    CompanyService.prototype.registerCompany = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var existingCompany, newCompany, token, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, Company_1.default.findOne({
                                company_email: data.company_email,
                            })];
                    case 1:
                        existingCompany = _a.sent();
                        if (existingCompany) {
                            throw new Error("Company already exists.");
                        }
                        return [4 /*yield*/, Company_1.default.create(data)];
                    case 2:
                        newCompany = _a.sent();
                        token = void 0;
                        if (newCompany) {
                            token = jsonwebtoken_1.default.sign({ id: newCompany._id }, this.SECRET_KEY, {
                                expiresIn: "7d",
                            });
                        }
                        return [2 /*return*/, { newCompany: newCompany, token: token }];
                    case 3:
                        error_1 = _a.sent();
                        throw Error(error_1.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // login company by sending otp to email address
    CompanyService.prototype.loginCompany = function (email, otp) {
        return __awaiter(this, void 0, void 0, function () {
            var company, isValidOTP, token, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, Company_1.default.findOne({ company_email: email })];
                    case 1:
                        company = _a.sent();
                        if (!company) {
                            throw new Error("Company not found.");
                        }
                        return [4 /*yield*/, otp_service_1.default.verifyOtp({ email: email, otp: otp })];
                    case 2:
                        isValidOTP = _a.sent();
                        token = void 0;
                        if (isValidOTP) {
                            // create the token using JWT token
                            token = jsonwebtoken_1.default.sign({ id: company._id }, this.SECRET_KEY, {
                                expiresIn: "7d",
                            });
                        }
                        return [2 /*return*/, { company: company, token: token }];
                    case 3:
                        error_2 = _a.sent();
                        throw Error(error_2.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //   get company information by email address
    CompanyService.prototype.getCompanyByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var company, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Company_1.default.findOne({ company_email: email })];
                    case 1:
                        company = _a.sent();
                        if (!company) {
                            throw new Error("Company not found.");
                        }
                        return [2 /*return*/, company];
                    case 2:
                        error_3 = _a.sent();
                        throw Error(error_3.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //   get company information by id
    CompanyService.prototype.getCompanyById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var company, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Company_1.default.findById(id)];
                    case 1:
                        company = _a.sent();
                        if (!company) {
                            throw new Error("Company not found.");
                        }
                        return [2 /*return*/, company];
                    case 2:
                        error_4 = _a.sent();
                        throw Error(error_4.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return CompanyService;
}());
exports.default = new CompanyService();
