const photoModel = require("../db/models/photo");
const uploadToMinio = require("../utils/uploadToMinio")
const {v4: uuidv4} = require("uuid");

// 图片上传
const upload = async (req, res) => {
   const file = req.file;
   const userId = req.body.userId;

   if (!file) {
       return res.status(400).json({
           success: false,
           message: '文件不能为空',
       });
   }

   const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
   const MAX_FILE_SIZE = 10 * 1024 * 1024;
   const id = uuidv4();

   if (!ALLOWED_MIME_TYPES.includes(req.file.mimetype)) {
       return res.status(400).json({
           success: false,
           message: `不支持的文件类型。仅支持: ${ALLOWED_MIME_TYPES.join(', ')}`
       });
   }

   if (req.file.size > MAX_FILE_SIZE) {
       return res.status(413).json({
           success: false,
           error: `文件大小超过限制 (${MAX_FILE_SIZE / 1024 / 1024}MB)`
       });
   }

   try {
       const result = await photoModel.insertPhoto({
           id: id,
           originalName: file.originalname,
           userId: userId,
           mimeType: file.type,
           storagePath: uploadToMinio('cropper-bucket', file.originalname, './public/image/photo.jpg', file.type),
           uploadedAt: new Date(),
           size: file.size,
       });

       if (result.affectedRows === 1) {
           res.status(201).json({
               success: true,
               message: '文件上传成功',
               // data: {
               //     photoId: result.insertId, // 假设返回插入ID
               //     fileName: req.file.originalname,
               //     fileSize: formatFileSize(req.file.size),
               //     previewUrl: `/preview/${result.insertId}` // 预览URL示例
               // }
           });
       } else {
           res.status(400).json({
               success: true,
               message: '数据库操作未影响行数',
           });
       }
   }
   catch (err) {
       return res.status(500).json({
           success: false,
           error: '文件上传失败',
           details: process.env.NODE_ENV === 'development' ? err : undefined
       });
   }
}

// 图片删除
const removePhoto = async (req, res) => {
    const id = req.query.id;

    const result = await photoModel.deletePhoto(id);

    if (result.affectedRows === 1) {
        res.status(201).json({
            msg: 'Photo remove successful!',
        });
    } else {
        res.status(400).json({
            error: 'Photo remove failed.',
        });
    }
}

// 获取对应用户的图片列表
const getPhotoList = async (req, res) => {
    const { userId } = req.body;

    try {
        const result = await photoModel.selectAllPhotoByUserId(userId);
        return res.status(200).json({
            success: true,
            msg: 'search successful!',
            data: result,
        });
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            msg: 'search failed.',
        });
    }
}

module.exports = {
    upload,
    removePhoto,
    getPhotoList
}
