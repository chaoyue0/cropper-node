const sharp = require('sharp');
const path = require('path');

const convertImageFormat = (inputPath, outputFolder, format, options = {}) => {
    return new Promise(async (resolve, reject) => {
        const transformer = sharp(inputPath);
        const outputPath = path.join(outputFolder, 'file-' + Date.now() + '_result.' + format);
        try {
            // 预先验证格式
            const supportedFormats = ['jpeg', 'jpg', 'png', 'webp', 'avif', 'tiff'];
            const formatLower = format.toLowerCase();

            if (!supportedFormats.includes(formatLower)) {
                return reject(new Error(`不支持的格式: ${format}`));
            }

            switch (format.toLowerCase()) {
                case 'jpeg':
                case 'jpg':
                    transformer.jpeg({
                        quality: options.quality || 90,
                        progressive: options.progressive || false
                    });
                    break;

                case 'png':
                    transformer.png({
                        compressionLevel: options.compressionLevel || 6,
                        palette: options.palette || false
                    });
                    break;

                case 'webp':
                    transformer.webp({
                        quality: options.quality || 90,
                        lossless: options.lossless || false
                    });
                    break;

                case 'avif':
                    transformer.avif({
                        quality: options.quality || 90,
                        lossless: options.lossless || false
                    });
                    break;

                case 'tiff':
                    transformer.tiff({
                        quality: options.quality || 90,
                        compression: options.compression || 'lzw'
                    });
                    break;
            }
            await transformer.toFile(outputPath);
            resolve(outputPath);
        } catch (error) {
            reject(new Error(`图片转换失败: ${error}`));
        }
    })
}

module.exports = convertImageFormat;
