const db = require('../config.js')

const insertUser = (data) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (id, name, password, create_time, coins, status) VALUES(?,?,?,?,?,?)';

        const params = [
            data.id,
            data.name,
            data.password,
            data.createTime,
            data.coins || 50, // 默认值
            data.status || 'active',
        ];

        db.query(query, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    })
}

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM users WHERE id = ?';

        db.query(query, [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    })
}

const updateUserName = (name, id) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE users set name = ? where id = ?';

        db.query(query, [name, id], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    })
}

const selectAllUser = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users';

        db.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        })
    })
}

const findByName = (name) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users where name = ?';

        db.query(query, [name], (error, results) => {
            if (error) {
                return reject(error);
            }

            if (results.length === 0) {
                resolve(null);
            } else {
                resolve(results[0]);
            }
        })
    })
}

module.exports = {
    insertUser,
    deleteUser,
    updateUserName,
    selectAllUser,
    findByName
}
