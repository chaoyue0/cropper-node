const db = require('../config.js');

const insertPhoto = (data) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO photo (name, user_id, data, upload_time, size) VALUES(?,?,?,?,?)';

        db.query(query, [data.name, data.userId, data.file, data.uploadTime, data.size], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    })
}

const deletePhoto = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM photo WHERE id = ?';

        db.query(query, [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    })
}

const selectAllPhotoByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM photo WHERE user_id = ?';

        db.query(query, [userId], (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        })
    })
}

module.exports = {
    insertPhoto,
    deletePhoto,
    selectAllPhotoByUserId
}

