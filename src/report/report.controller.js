import excelJS from "exceljs";
import fs from "fs";
import path from "path";
import { __dirname } from "./utils-dirname.js";
import { filterAndSortCompanies } from "../helpers/filterSortCompanies.js";

export const generateExcelReport = async (req, res) => {
    try {
        const { filter, value, sort } = req.query;

        const companies = await filterAndSortCompanies(filter, value, sort);

        if (!companies || companies.length === 0) {
            return res.status(404).json({ msg: "No hay empresas que coincidan con los filtros." });
        }

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("Empresas");

        worksheet.columns = [
            { header: "Nombre", key: "name", width: 30 },
            { header: "Categoría", key: "category", width: 20 },
            { header: "Años de experiencia", key: "yearsOfExperience", width: 20 },
            { header: "Correo de contacto", key: "contactEmail", width: 30 },
            { header: "Teléfono", key: "phone", width: 15 },
            { header: "Descripción", key: "description", width: 40 }
        ];

        const formattedCompanies = companies.map(company => ({
            name: company.name,
            category: company.category.name, 
            yearsOfExperience: company.yearsOfExperience,
            contactEmail: company.contactEmail,
            phone: company.phone,
            description: company.description
        }));

        worksheet.addRows(formattedCompanies);

        const reportsPath = path.join(__dirname, "../../reports");
        
        if (!fs.existsSync(reportsPath)) {
            fs.mkdirSync(reportsPath, { recursive: true });
        }

        const fileName = `Reporte-Empresas.xlsx`;
        const filePath = path.join(reportsPath, fileName);
        await workbook.xlsx.writeFile(filePath);

        return res.status(200).json({
            msg: "Reporte generado exitosamente",
            downloadURL: `http://localhost:3000/reports/${fileName}`
        });

    } catch (error) {
        console.error("Error al generar reporte:", error);
        return res.status(500).json({ msg: "Error al generar reporte", error: error.message });
    }
};