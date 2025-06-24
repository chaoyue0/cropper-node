const Minio = require('minio');

const minioClient = new Minio.Client({
    endPoint: '127.0.0.1', //主机域名或ip地址
    port: 9000, //端口
    useSSL: false, //需要https访问就开启true，像我这样懒的就不开了
    //配置accessKey secretKey
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
});

const uploadToMinio = async (bucketName, fileName, file, type) => {
    return new Promise((resolve, reject) => {
        //设置文件类型
        const metaData = {
            // 'Content-Type': 'application/octet-stream'//二进制文件
            // 'Content-Type': 'image/png' //图片
            'Content-Type': type
        };

        minioClient.fPutObject(bucketName, fileName, file, metaData, function (err, objInfo) {
            if (err) return reject(err);
            resolve(objInfo);
        });
    });
}

module.exports = uploadToMinio;
