import Joi from "joi";

const validator = {
    registerUser: (data: any) => {
        const schema = Joi.object({
            name: Joi.string().required().min(3).max(255).messages({
                "string.empty": "Nama tidak boleh kosong.",
                "string.min": "Nama minimal {{#limit}} karakter.",
                "string.max": "Nama maksimal {{#limit}} karakter.",
            }),
            email: Joi.string().email().required().messages({
                "string.empty": "Email tidak boleh kosong.",
                "string.email": "Format email tidak valid.",
            }),
            password: Joi.string().min(6).required().messages({
                "string.empty": "Password tidak boleh kosong.",
                "string.min": "Password minimal {{#limit}} karakter.",
            }),
            role: Joi.string().valid("01", "02", "03").optional().messages({
                "string.valid": "Role harus salah satu dari [admin, user].",
            }),
            nisn: Joi.string().required().messages({
                "string.empty": "NISN tidak boleh kosong."
            })
        });

        const { error, value } = schema.validate(data);

        if (error) {
            throw new Error(error.details.map(detail => detail.message).join(", "));
        }
    },
};

export = validator;