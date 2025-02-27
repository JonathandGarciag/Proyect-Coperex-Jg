"use strict";

import express from 'express';
import cors from 'cors';
import path from "path";
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import { __dirname } from "../src/report/utils-dirname.js";  

import  createRoles  from '../src/database/default-role.js'
import createAdmin from '../src/database/default-admin.js';
import createDefaultCategory from '../src/database/default-category.js';
import limiter from '../src/middlewares/validar-cant-peticiones.js';

import CategoryRoutes from '../src/category/category.routes.js';
import ReportRoutes from '../src/report/report.routes.js';
import AuthRoutes from '../src/auth/auth.routes.js';
import CompanyRoutes from '../src/company/company.routes.js';


const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(express.json())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)
    const reportsPath = path.join(__dirname, "../../reports");
    app.use("/reports", express.static(reportsPath));
} 



const routes = (app) => {
    app.use("/proyect-coperex/v4/auth", AuthRoutes)
    app.use("/proyect-coperex/v4/category", CategoryRoutes)
    app.use("/proyect-coperex/v4/company", CompanyRoutes)
    app.use("/proyect-coperex/v4/report", ReportRoutes)
}

const conectarDB = async () =>{
    try {
        await dbConnection();
        console.log("Conexion a la base de datos exitosa");
    } catch (error) {
        console.error('Error conectado ala base de datos', error);
        process.exit(1);
    }
}

export const initServer = async () =>{
    const app = express();
    const port = process.env.PORT || 3000;

    try {
        middlewares(app);
        conectarDB();
        routes(app);;  
        await createRoles();
        await createDefaultCategory();  
        await createAdmin();  
        app.listen(port);
        console.log(`Server running on port ${port}`)
    } catch (err) {
        console.log(`Server init failed ${err}`);
    }
}