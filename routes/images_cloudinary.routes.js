import { Router } from "express";
import cloudinary from "cloudinary";
import fs from "fs-extra";
import { URL } from "../config.js";

const router = Router();

// Configuration
cloudinary.v2.config({
  cloud_name: "dfrujr0bd",
  api_key: "121956487627374",
  api_secret: "RUMBQ1PmRN1UDH4nnv9z57QgF9s",
});

// RUTA: Para guardar una publicación del usuario (backend)
router.post(`${URL}/cloudinary_submit`, async (req, res) => {
  try {
    if (req.files?.file) {
      const file = req.files.file;
      const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: "my_photo_room",
      });
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

router.put(`${URL}/cloudinary_submit`, async (req, res) => {
  try {
    const { imgName } = req.body;
    const result = await cloudinary.v2.uploader.destroy(imgName);
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.patch(`${URL}/cloudinary_submits`, async (req, res)=>{
  try{
    console.log("-----------------")
    console.log(req.body);
    const imgNames = req.body
    imgNames.forEach(image=>{
      const result = cloudinary.v2.uploader.destroy(image);
      console.log(result);
    });
    /*
    cloudinary.api.delete_resources(
      imgArr,
      function(error, result) {
          console.log(result, error)
      }
    );
    */
    res.json({
      message: "Imágenes eliminadas de Cloudinary satisfactoriamente."
    })
  }
  catch(error){
    return res.status(500).json({
      message: error.message,
    });
  }
})

router.delete("/hola", async (req, res)=>{
  res.send("Hola")
})

export default router;
