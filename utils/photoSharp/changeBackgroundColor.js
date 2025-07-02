const axios = require('axios');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { File } = require('node:buffer');

const changeBackgroundColor = (FilePath, bgColor) => {
    return new Promise(async (resolve, reject) => {
        try {
            const bufferData = fs.readFileSync(FilePath);
            const file = new File([bufferData], 'data.png', {
                type: 'image/png',
                lastModified: Date.now()
            });
            const { Client } = await import("@gradio/client"); // 动态导入
            const client = await Client.connect("http://101.34.208.127:7000/");
            const result = await client.predict("/predict", [
                file, // Blob | File | Buffer
                "u2net_human_seg", // model
                true, // Alpha matting
                240, // Foreground threshold
                10, // Background threshold
                40, // Erosion size
                false, // Only mask
                true,  // Post process mask
            ]);
            const imageBuffer = await axios.get(result.data[0].url, {
                responseType: 'arraybuffer' // 关键：获取二进制数据
            });
            const outputImage = path.join(__dirname, 'output-with-background.png');
            const output = sharp(imageBuffer.data).flatten({
                background: bgColor
            }).toFile(outputImage);
            resolve(outputImage);
        }
        catch (err) {
            reject('请求失败:' + err);
        }
    })
}

module.exports = changeBackgroundColor;
