const mysql = require('mysql');

// 创建连接
const connection = mysql.createConnection({
    host: 'localhost',     // 数据库主机地址
    user: 'root',          // 数据库用户名
    password: '123456',  // 数据库密码
    database: 'cropper_node'    // 要连接的数据库名称
});

// 测试连接
connection.connect((err) => {
    if (err) {
        console.error('连接失败：' + err.stack);
        return;
    }
    console.log('成功连接到数据库，ID为 ' + connection.threadId);
});

module.exports = connection;
