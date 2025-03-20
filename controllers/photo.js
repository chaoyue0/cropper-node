const photoModel = require("../db/models/photo");

// 图片上传
const upload = async (req, res) => {
   const file = req.file;
   if (!file) {
       return res.status(400).json({
           success: false,
           error: 'file is required',
       });
   }

   const result = await photoModel.insertPhoto({
       name: file.originalname,
       userId: 1, // 暂时默认用户1上传图片
       file: file.buffer,
       uploadTime: new Date(),
       size: file.size,
   });

   if (result.affectedRows === 1) {
       res.status(200).json({
           success: true,
           msg: 'upload successful!',
       });
   } else {
       res.status(400).json({
           error: 'upload failed.',
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

    const result = await photoModel.selectAllPhotoByUserId(userId);

    res.status(200).json({
        success: true,
        msg: 'search successful!',
        data: result,
    });
}

module.exports = {
    upload,
    removePhoto,
    getPhotoList
}
