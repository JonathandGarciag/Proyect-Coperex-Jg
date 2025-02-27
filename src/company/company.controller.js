import Company from "../company/company.model.js";
import Category from "../category/category.model.js";

export const registerCompany = async (req, res) => {
    try {
        const { name, impactLevel, yearsOfExperience, category, contactEmail, phone, description } = req.body;

        const existingCategory = await Category.findOne({ name: category });
        if (!existingCategory) {
            return res.status(400).json({ msg: "La categoría no existe" });
        }

        const newCompany = new Company({
            name,
            impactLevel,
            yearsOfExperience,
            category: existingCategory._id,
            contactEmail,
            phone,
            description
        });

        await newCompany.save();
        res.status(201).json({ msg: "Empresa registrada correctamente", company: newCompany });

    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor", error: error.message });
    }
};

export const getCompanies = async (req, res) => {
    try {
        let { filter, sort } = req.query;
        let query = {};

        if (filter === "category" && req.query.value) {
            query.category = req.query.value;
        }

        if (filter === "yearsOfExperience" && req.query.value) {
            query.yearsOfExperience = { $gte: parseInt(req.query.value, 10) };
        }

        let companies = await Company.find(query).populate("category", "name");

        if (sort === "A-Z") {
            companies.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === "Z-A") {
            companies.sort((a, b) => b.name.localeCompare(a.name));
        }

        res.status(200).json({
            success: true,
            total: companies.length,
            companies
        });
    } catch (error) {
        console.error("Error al obtener empresas:", error);
        res.status(500).json({ success: false, msg: "Error al obtener empresas" });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, impactLevel, yearsOfExperience, category, contactEmail, phone, description } = req.body;

        const company = await Company.findById(id);
        if (!company) {
            return res.status(404).json({ msg: "Empresa no encontrada" });
        }

        if (category) {
            const existingCategory = await Category.findOne({ name: category });
            if (!existingCategory) {
                return res.status(400).json({ msg: "La categoría no existe" });
            }
            company.category = existingCategory._id;
        }

        if (name) company.name = name;
        if (impactLevel) company.impactLevel = impactLevel;
        if (yearsOfExperience !== undefined) company.yearsOfExperience = yearsOfExperience;
        if (contactEmail) company.contactEmail = contactEmail;
        if (phone) company.phone = phone;
        if (description) company.description = description;
        company.updatedAt = Date.now();

        await company.save();
        res.status(200).json({ msg: "Empresa actualizada correctamente", company });

    } catch (error) {
        console.error("Error al actualizar empresa:", error);
        res.status(500).json({ msg: "Error en el servidor", error: error.message });
    }
};
