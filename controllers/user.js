const userModel = require("../db/models/users");

// 查找用户
const getUserList = async (req, res) => {
    try {
        const result = await userModel.selectAllUser();
        res.status(200).json({
            success: true,
            message: '查询成功',
            data: result
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: '查找失败',
        });
    }
}

module.exports = {
    getUserList
}
