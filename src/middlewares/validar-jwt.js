import jwt from 'jsonwebtoken';
import Admin from '../admin/admin.model.js';

export const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            success: false,
            msg: "No hay token en la petición",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const admin = await Admin.findById(uid);

        if (!admin) {
            return res.status(401).json({
                success: false,
                msg: "Administrador no existe en la base de datos",
            });
        }

        req.admin = admin; 
        next();

    } catch (error) {
        console.error("Error en validarJWT:", error);
        return res.status(401).json({
            success: false,
            msg: "Token no válido",
        });
    }
};
