import Category from "../category/category.model.js";

export const preventDefaultCategoryDeletion = async function (next) {
    const category = await Category.findOne(this.getFilter());
    if (category.isDefault) {
        throw new Error("No se puede eliminar la categoría por defecto.");
    }
    next();
};
