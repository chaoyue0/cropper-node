// body 参数校验
const validateRequiredFields = (requiredFields) => {
    return (req, res, next) => {
        const errors = {};

        requiredFields.forEach(field => {
            if (!req.body[field] || req.body[field].trim() === '') {
                errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            }
        });

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        next(); // 校验通过，继续处理
    };
};

module.exports = validateRequiredFields;
