// query 参数校验
function validateQueryParams(requiredParams) {
    return (req, res, next) => {
        const missingParams = requiredParams.filter(
            param => !(param in req.query) || req.query[param] === ''
        );

        if (missingParams.length > 0) {
            return res.status(400).json({
                error: `Missing required query parameters: ${missingParams.join(', ')}`,
            });
        }

        // 参数校验通过，继续执行
        next();
    };
}

module.exports = validateQueryParams;
