const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dqa43ouyc",
    api_key: process.env.CLOUDINARY_API_KEY || "841664836122733",
    api_secret: process.env.CLOUDINARY_API_SECRET || "KFLf60Yaai3DaEw0k21t-tUCl7Q"
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'corevault_products',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 800, height: 800, crop: 'limit' }]
    }
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };