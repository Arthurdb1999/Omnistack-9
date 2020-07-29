const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        //sem usar ../../ porque windows nao entende essas barras
        // a virgula do path.resolve seria a barra
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext)

            cb(null, `${name}-${Date.now()}${ext}`);
        },
    }),
};