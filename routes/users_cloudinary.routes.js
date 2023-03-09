import { Router } from "express";
import cloudinary from "cloudinary";
import fs from "fs-extra";

const router = Router();

// Configuration
cloudinary.v2.config({
  cloud_name: "dfrujr0bd",
  api_key: "121956487627374",
  api_secret: "RUMBQ1PmRN1UDH4nnv9z57QgF9s",
});

// RUTA: Para guardar imágen de perfil (cloudinary)
router.post(`${URL}/cloudinary_profile`, async (req, res) => {
  try {
    if (req.files?.file) {
      const result = await cloudinary.v2.uploader.upload(
        req.files.file.tempFilePath,
        {
          folder: "my_photo_room",
        }
      );
      console.log(result);
      res.json(result);
      await fs.unlink(req.files.file.tempFilePath);
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// RUTA: Para eliminar imágen de perfil (cloudinary)
router.put(`${URL}/cloudinary_profile`, async (req, res)=>{
  try{
    const { imgName } = req.body;
    const result = await cloudinary.v2.uploader.destroy(imgName);
    res.json(result);
  }
  catch(error){
    return res.status(500).json({
      message: error.message,
    })
  }
});

export default router;