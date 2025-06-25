const db = require('../config.js');

const insertPhoto = (data) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO photos (id, storage_path, mime_type, original_name, user_id, uploaded_at, size) VALUES(?,?,?,?,?,?,?)';

        const params = [
            data.id,
            data.storagePath,
            data.mimeType,
            data.originalName,
            data.userId,
            data.uploadedAt,
            data.size
        ];

        db.query(query, params, (error, results) => {
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

