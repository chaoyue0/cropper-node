const multer = require('multer');

// 文件存储：磁盘
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         const ext = path.extname(file.originalname);
//         cb(null, file.fieldname + '-' + Date.now() + ext)
//     }
// });

// 文件存储：内存
const storage = multer.memoryStorage();

const parseFile = multer({ storage }).single('file');

module.exports = parseFile;
