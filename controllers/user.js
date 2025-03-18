const userModel = require("../db/models/user");

// 注册账户
const register = async (req, res) => {
    const { name, password } = req.body;
    const createTime = new Date();

    const result = await userModel.insertUser({ name, password, createTime });

    if (result.affectedRows === 1) {
        res.status(201).json({
            msg: 'Registration successful!',
        });
    } else {
        res.status(400).json({
            error: 'Registration failed.',
        });
    }
}

// 注销账户
const destroy = async (req, res) => {
    const id = req.query.id;

    const result = await userModel.deleteUser(id);

    if (result.affectedRows === 1) {
        res.status(201).json({
            msg: 'Destroy successful!',
        });
    } else {
        res.status(400).json({
            error: 'Destroy failed.',
        });
    }
}

// 修改用户名
const modifyName = async (req, res) => {
    const { name, id } = req.body;

    const result = await userModel.updateUserName(name, id);

    if (result.affectedRows === 1) {
        res.status(201).json({
            msg: 'Modify successful!',
        });
    } else {
        res.status(400).json({
            error: 'Modify failed.',
        });
    }
}

module.exports = {
    register,
    destroy,
    modifyName
}
