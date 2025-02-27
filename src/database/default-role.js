import Role from "../role/role.model.js";  

const createRoles = async () => {
    try {
        const existingRole = await Role.findOne({ role: "ADMIN_ROLE" });

        if (!existingRole) {
            await Role.create({ role: "ADMIN_ROLE" });
            console.log("--> Rol ADMIN_ROLE creado correctamente.");
        } else {
            console.log("--> El rol ADMIN_ROLE ya existe.");
        }
    } catch (error) {
        console.error("--> Error al crear el rol ADMIN_ROLE:", error.message);
    }
};

export default createRoles;
