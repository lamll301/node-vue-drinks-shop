
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });

module.exports = function uploadImgMiddleware(req, res, next) {
    
}