import { verify } from "argon2";
import Admin from "../admin/admin.model.js";
import { generarJWT } from "../helpers/generate-jwt.js";

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const lowerEmail = email ? email.toLowerCase() : null;
        const admin = await Admin.findOne({ email: lowerEmail });

        if (!admin) {
            return res.status(400).json({
                msg: "Credenciales incorrectas, el correo no existe en la base de datos"
            });
        }

        if (!admin.status) {
            return res.status(400).json({
                msg: "El administrador está deshabilitado"
            });
        }

        if (!admin.password.startsWith("$argon2")) {
            return res.status(500).json({ msg: "Error: La contraseña almacenada no es válida." });
        }

        const validPassword = await verify(admin.password, password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "La contraseña es incorrecta"
            });
        }

        const token = await generarJWT(admin._id);

        return res.status(200).json({
            msg: "Inicio de sesión exitoso",
            userDetails: {
                username: admin.username,
                email: admin.email, 
                role: admin.role,
                token: token,
            }
        });

    } catch (error) {
        console.log("Error en loginAdmin:", error);
        return res.status(500).json({
            msg: "Error en el servidor",
            error: error.message
        });
    }
};
