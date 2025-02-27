import { Router } from "express";
import { generateExcelReport } from "./report.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get(
    "/excelReport", 
    validarJWT, 
    generateExcelReport
);

export default router;
