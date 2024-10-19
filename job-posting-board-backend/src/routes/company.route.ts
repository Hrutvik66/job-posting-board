import { Router } from "express";
// company controller
import companyController from "../controller/company.controller";
import { auth } from "../middleware/auth.middleware";

const companyRouter = Router();

// register company route
companyRouter.post("/register", companyController.registerCompany);
// login company route
companyRouter.post("/login", companyController.loginCompany);
// get company routes
companyRouter.get("/", auth, companyController.getCompanyById);

export default companyRouter;