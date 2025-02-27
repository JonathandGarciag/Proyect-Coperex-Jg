import Company from "../company/company.model.js";

export const filterAndSortCompanies = async (filter, value, sort) => {
    let query = {};

    if (filter === "category" && value) {
        query.category = value;
    }

    if (filter === "yearsOfExperience" && value) {
        query.yearsOfExperience = parseInt(value, 10);
    }

    let companies = await Company.find(query).populate("category", "name");

    if (sort === "A-Z") {
        companies.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "Z-A") {
        companies.sort((a, b) => b.name.localeCompare(a.name));
    }

    return companies;
};
