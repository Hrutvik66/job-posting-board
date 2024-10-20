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
var otp_generator_1 = __importDefault(require("otp-generator"));
var OTP_1 = __importDefault(require("../model/OTP"));
// company service
var company_service_1 = __importDefault(require("../service/company.service"));
var OTPService = /** @class */ (function () {
    function OTPService() {
    }
    // generate otp for company login
    OTPService.prototype.generateOtp = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var company, otp, result, res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, company_service_1.default.getCompanyByEmail(email)];
                    case 1:
                        company = _a.sent();
                        otp = otp_generator_1.default.generate(6, {
                            upperCaseAlphabets: false,
                            lowerCaseAlphabets: false,
                            specialChars: false,
                        });
                        return [4 /*yield*/, OTP_1.default.findOne({ otp: otp })];
                    case 2:
                        result = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!result) return [3 /*break*/, 5];
                        otp = otp_generator_1.default.generate(6, {
                            upperCaseAlphabets: false,
                        });
                        return [4 /*yield*/, OTP_1.default.findOne({ otp: otp })];
                    case 4:
                        result = _a.sent();
                        return [3 /*break*/, 3];
                    case 5: return [4 /*yield*/, OTP_1.default.create({
                            company_name: company.company_name,
                            email: company.company_email,
                            otp: otp,
                        })];
                    case 6:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 7:
                        error_1 = _a.sent();
                        throw Error(error_1.message);
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // 
    OTPService.prototype.sendOtp = function (email, company_name) {
        return __awaiter(this, void 0, void 0, function () {
            var otp, result, res, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        otp = otp_generator_1.default.generate(6, {
                            upperCaseAlphabets: false,
                            lowerCaseAlphabets: false,
                            specialChars: false,
                        });
                        return [4 /*yield*/, OTP_1.default.findOne({ otp: otp })];
                    case 1:
                        result = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!result) return [3 /*break*/, 4];
                        otp = otp_generator_1.default.generate(6, {
                            upperCaseAlphabets: false,
                        });
                        return [4 /*yield*/, OTP_1.default.findOne({ otp: otp })];
                    case 3:
                        result = _a.sent();
                        return [3 /*break*/, 2];
                    case 4: return [4 /*yield*/, OTP_1.default.create({
                            company_name: company_name,
                            email: email,
                            otp: otp,
                        })];
                    case 5:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 6:
                        error_2 = _a.sent();
                        throw Error(error_2.message);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    //   verify otp
    OTPService.prototype.verifyOtp = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var email, otp, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        email = data.email, otp = data.otp;
                        return [4 /*yield*/, OTP_1.default
                                .find({ email: email })
                                .sort({ createdAt: -1 })
                                .limit(1)];
                    case 1:
                        response = _a.sent();
                        if (response.length === 0) {
                            throw new Error("OTP is expired");
                        }
                        else if (otp !== response[0].otp) {
                            throw new Error("Invalid OTP.");
                        }
                        return [2 /*return*/, true];
                    case 2:
                        error_3 = _a.sent();
                        throw Error(error_3.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return OTPService;
}());
exports.default = new OTPService();
