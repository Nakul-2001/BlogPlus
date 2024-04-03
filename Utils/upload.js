import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
    cloud_name: 'djnmooypz', 
    api_key: '888852213559784', 
    api_secret: 'pb4r-i8SRsTyT5yJhSGIAYcWWuw', 
});

const upload = async (filePath) => {
    try {
        const res = await cloudinary.uploader.upload(filePath);
        return res.url;
    } catch (error) {
        console.log('error',error.message);
    }
}

export default upload;