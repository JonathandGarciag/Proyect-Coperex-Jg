
import Category from "./category.model.js";

export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ msg: "La categoría ya existe." });
        }

        const newCategory = new Category({ name, description });
        await newCategory.save();

        res.status(201).json({
            success: true,
            msg: "Categoría creada correctamente",
            category: newCategory
        });

    } catch (error) {
        res.status(500).json({ success: false, msg: "Error al crear categoría", error: error.message });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            total: categories.length,
            categories
        });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error al obtener categorías", error: error.message });
    }
};