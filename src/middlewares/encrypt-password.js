import { hash } from "argon2";

export const encryptPassword = async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await hash(this.password);
    next();
};
