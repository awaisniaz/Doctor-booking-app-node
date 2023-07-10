import multer from 'multer'
const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        // Set the destination folder based on file type
        if (file.fieldname === 'profileImage') {
            cb(null, 'uploads/profile');
        } else {
            cb(null, 'uploads/other');
        }
    },
    filename: (req: any, file: any, cb: any) => {
        // Generate a unique filename for the uploaded file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
    },
});

const upload = multer({ storage: storage });
export default upload
