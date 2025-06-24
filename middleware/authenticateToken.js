const jwt = require('jsonwebtoken');

// JWT 身份验证
const authenticateToken = () => {
    return (req, res, next) => {
        const token = req.header('Authorization');

        if (!token) return res.status(401).json({
            success: false,
            message: '缺少认证令牌'
        });

        try {
            req.user = jwt.verify(token, process.env.JWT_SECRET);
            next();
        } catch (error) {
            res.status(403).json({
                success: false,
                message: '无效的令牌'
            });
        }
    };
}

module.exports = authenticateToken;
