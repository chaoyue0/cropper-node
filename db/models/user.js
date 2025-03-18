const db = require('../config.js')

const insertUser = (data) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO user (name, password, create_time) VALUES(?,?,?)';

        db.query(query, [data.name, data.password, data.createTime], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    })
}

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM user WHERE id = ?';

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
        const query = 'UPDATE user set name = ? where id = ?';

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
        const query = 'SELECT * FROM user';

        db.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        })
    })
}

module.exports = {
    insertUser,
    deleteUser,
    updateUserName,
    selectAllUser,
}
