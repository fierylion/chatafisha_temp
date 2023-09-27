const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')

// Create an instance of the S3 service
const s3 = new AWS.S3()

// function to sanitize files and send error for unsupported files
function sanitizeFile(file, cb) {
    // Define the allowed extension
    const fileExts = [".png", ".jpg", ".jpeg", ".gif"];

    // Check allowed extensions
    const isAllowedExt = fileExts.includes(
        path.extname(file.originalname.toLowerCase())
    );

    // Mime type must be an image
    const isAllowedMimeType = file.mimetype.startsWith("image/");

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true); // no errors
    } else {
        // pass error msg to callback, which can be displaye in frontend
        cb("Error: File type not allowed!");
    }
}

// Configure multer middleware for file upload
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET,
    fileFilter: (req, file, callback) => {
      
      sanitizeFile(file, callback)
    },

    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const fileName =
        Date.now() + '_me.' + file.originalname.split('.').pop()
        console.log(fileName)
      cb(null, fileName)
    },
  }),
})



module.exports = upload
