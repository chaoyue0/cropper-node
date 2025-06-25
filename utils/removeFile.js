const fs = require('fs');
const path = require('path');

const folder = 'public/image';

const removeFile = () => {
    fs.readdir(folder, (err, files) => {
        if (err) {
            console.error('读取目录失败', err);
            return;
        }

        files.forEach(file => {
            let filePath = path.join(folder, file);

            fs.unlink(filePath, removeErr => {
                if (removeErr) {
                    console.error(`删除文件出错: ${filePath}`, removeErr);
                } else {
                    console.log(`文件删除成功: ${filePath}`);
                }
            });
        });
    });
}

module.exports = removeFile;
