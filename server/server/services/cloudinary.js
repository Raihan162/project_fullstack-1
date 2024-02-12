const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name: 'First_Cloudinary',
    api_key: '958256199976166',
    api_secret: 'TR9rfXpXNsH9BSY1vlRFL5gg9gM',
})

const uploadToCloudinary = async (data, resourceType) => {
    return new Promise((resolve, reject) => {
        let uploadStream

        if (data.buffer) {
            uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: resourceType,
                    folder: resourceType,
                },
                (error, result) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(result)
                    }
                }
            )
            uploadStream.end(data.buffer)
        } else {
            cloudinary.uploader
                .upload(data, {
                    resource_type: resourceType,
                    folder: resourceType,
                })
                .then(result => resolve(result))
                .catch(error => reject(error))
        }
    })
};

module.exports = {
    uploadToCloudinary,
}