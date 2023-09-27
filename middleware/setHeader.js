// Middleware to set the Content-Type header
const setContentTypeHeader = (req, res, next) => {
  // Assuming the file field name is 'image'
 
  if(req.file && !Array.isArray(req.file)) {
    req.file.contentType = req.file.mimetype
  }
  else if (req.file && Array.isArray(req.file) && req.file.length > 0) {
    req.file.forEach((file) => {
     
    file.contentType = file.mimetype
    });
  }
  next()
}
module.exports = setContentTypeHeader