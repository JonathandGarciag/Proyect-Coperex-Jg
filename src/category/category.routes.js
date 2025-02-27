import { Router } from "express";
import { getCategories, createCategory } from "./category.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get(
    "/", 
    getCategories
);

router.post(
    "/newCategory", 
    validarJWT, 
    createCategory
);

export default router;
