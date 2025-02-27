import { Router } from "express";
import { registerCompany, getCompanies, updateCompany } from "./company.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/register", 
    validarJWT, 
    registerCompany
);

router.get(
    "/viewCompanies", 
    validarJWT, 
    getCompanies
);

router.put(
    "/updateCompany/:id", 
    validarJWT, 
    updateCompany
);

export default router;
