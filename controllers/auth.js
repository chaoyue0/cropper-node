const authModel = require("../db/models/auth");
const { v4: uuidv4 } = require('uuid');

// 注册账户
const register = async (req, res) => {
    const { name, password } = req.body;
    const createTime = new Date();

    if (!name || !password) {
        return res.status(400).json({
            error: '用户名和密码是必填项'
        });
    }

    // 验证用户名格式 (字母数字组合)
    const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
    if (!usernameRegex.test(name)) {
        return res.status(400).json({
            error: '用户名必须是4-20位的字母、数字或下划线组合'
        });
    }

    // 验证密码强度
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            error: '密码必须至少8位，且包含大小写字母和数字'
        });
    }

    // 用户名唯一性检查
    try {
        const existingUser = await authModel.findByName(name);
        if (existingUser) {
            return res.status(409).json({
                error: '用户名已被占用'
            });
        }
    }
    catch (err) {
        res.status(400).json({
            error: '用户查询失败！' + err,
        });
    }

    const userId = uuidv4();
    const newUser = {
        id: userId,
        name,
        password,
        createTime,
        coins: 50, // 注册赠送50金币
        status: 'active', // 用户状态
    }

    try {
        const result = await authModel.insertUser(newUser);
        if (result.affectedRows === 1) {
            res.status(201).json({
                success: true,
                msg: '注册成功，欢迎加入！',
            });
        }
    }
    catch (err) {
        res.status(400).json({
            error: '用户注册失败！' + err,
        });
    }
}

// 登录
const login = async (req, res) => {
    const { name, password } = req.body;
}

// 注销账户
const destroy = async (req, res) => {
    const id = req.query.id;

    const result = await authModel.deleteUser(id);

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

    const result = await authModel.updateUserName(name, id);

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
