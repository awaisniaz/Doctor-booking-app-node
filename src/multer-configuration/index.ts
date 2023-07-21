import multer from 'multer'
const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        // Set the destination folder based on file type
        if (file.fieldname === 'profileImage') {
            cb(null, 'uploadsdat/profile');
        } else {
            cb(null, 'uploadsdat/other');
        }
    },
    filename: (req: any, file: any, cb: any) => {
        // Generate a unique filename for the uploaded file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
    },

});
const fileFilter = (req: any, file: any, cb: any) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const fileExtension = file.originalname.toLowerCase().slice(-4);
    const isAllowed = allowedExtensions.includes(fileExtension);
    if (isAllowed) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpg, .jpeg, and .png files are allowed!'), false);
    }
};

const upload = multer({ storage: storage, fileFilter });
export default upload
