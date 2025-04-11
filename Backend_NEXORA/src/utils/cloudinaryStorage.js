const cloudinary = require('../../config/cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: 'NEXORA-uploads',
        allowed_formets: ['jpg', 'jpeg', 'png', 'svg']
    }
})

module.exports = storage