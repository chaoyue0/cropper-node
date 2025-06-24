const userModel = require("../db/models/users");
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// 注册账户
const register = async (req, res) => {
    const { name, password } = req.body;
    const createTime = new Date();

    // 验证用户名格式 (字母数字组合)
    const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
    if (!usernameRegex.test(name)) {
        return res.status(400).json({
            success: false,
            message: '用户名必须是4-20位的字母、数字或下划线组合'
        });
    }

    // 验证密码强度
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            success: false,
            message: '密码必须至少8位，且包含大小写字母和数字'
        });
    }

    // 用户名唯一性检查
    try {
        const existingUser = await userModel.findByName(name);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: '用户名已被占用'
            });
        }
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: '用户查询失败！' + err,
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
        const result = await userModel.insertUser(newUser);
        if (result.affectedRows === 1) {
            return res.status(201).json({
                success: true,
                msg: '注册成功，欢迎加入！',
            });
        }
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: '用户注册失败！' + err,
        });
    }
}

// 登录
const login = async (req, res) => {
    const { name, password } = req.body;

    try {
        const existingUser = await userModel.findByName(name);
        if (existingUser) {
            if (password === existingUser.password) {
                process.env.JWT_SECRET = crypto.randomBytes(32).toString('hex');
                let token = jwt.sign({ user: name }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.set('Authorization', token);
                return res.status(200).json({
                    success: true,
                    msg: '登录成功！',
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: '密码输入错误请重试！'
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: '用户名不存在',
            });
        }
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: '用户查询失败' + err,
        });
    }
}

// 退出
const logout = async (req, res) => {

}

// 注销账户
const destroy = async (req, res) => {
    const id = req.query.id;

    const result = await userModel.deleteUser(id);

    if (result.affectedRows === 1) {
        res.status(200).json({
            msg: 'Destroy successful!',
        });
    } else {
        res.status(400).json({
            message: 'Destroy failed.',
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
            message: 'Modify failed.',
        });
    }
}

module.exports = {
    register,
    login,
    destroy,
    modifyName
}
