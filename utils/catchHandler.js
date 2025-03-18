// 封装 try/catch 函数
function catchHandler(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            res.status(500).json({
                error: 'Internal server error. Please try again later.',
            });
        }
    };
}

module.exports = catchHandler;
