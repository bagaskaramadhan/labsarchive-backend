import Joi from "joi";

const validator = {
    validateParams: (params: any) => {
        for (const value of Object.values(params)) {
            if (!value) {
                throw new Error(`Data tidak boleh kosong.`);
            }

            const str = String(value);
            if (/[^\p{ASCII}]|['":*?<>\^$\\|%]/u.test(str)) {
                throw new Error(`Parameter tidak boleh mengandung karakter khusus.`);
            }
        }
    },

    registerUser: (data: any) => {
        const schema = Joi.object({
            name: Joi.string().required().min(3).max(255).messages({
                "string.empty": "Nama tidak boleh kosong.",
                "string.min": "Nama minimal {{#limit}} karakter.",
                "string.max": "Nama maksimal {{#limit}} karakter.",
            }),
            nisn: Joi.string().required().messages({
                "string.empty": "NISN tidak boleh kosong.",
            }),
            password: Joi.string().min(6).required().messages({
                "string.empty": "Password tidak boleh kosong.",
                "string.min": "Password minimal {{#limit}} karakter.",
            }),
            role: Joi.string().valid("01", "02").optional().messages({
                "string.empty": "Role tidak boleh kosong.",
            })
        });

        const { error, value } = schema.validate(data);

        if (error) {
            throw new Error(error.details.map(detail => detail.message).join(", "));
        }
    },
};

export = validator;