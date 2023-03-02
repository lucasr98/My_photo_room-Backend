import { Router } from "express";
import { URL } from "../config.js";
import multer from "multer";
import fs from "fs";

const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/submits");
  },
  filename: (req, file, cb) => {
    const user = req.params.user;
    const date = req.params.date;
    cb(null, `${date}__${user}__${file.originalname}`);
  },
});

const upload = multer({ storage });

// RUTA: Para guardar una publicación del usuario (backend)
router.post(
  `${URL}/backend_submit/:user/:date`,
  upload.single("file"),
  (req, res, next) => {
    const file = req.file;
    console.log(file);
    if (!file) {
      const error = new Error("No hay archivos");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send(file);
  }
);

// RUTA: Para eliminar una publicación (backend)
router.delete(`${URL}/backend_submit/:imgName`, async (req, res)=>{
  try{
    const filePath = `uploads/submits/${req.params.imgName}`;
    fs.access(filePath, (error)=>{
      if(!error){
        fs.unlinkSync(filePath);
        console.log("Imágen eliminada del backend exitosamente.");
        res.json({
          message: `Imágen eliminada: ${filePath}`
        })
      }
      else{
        console.log(error);
      }
    })
  }
  catch(error){
    return res.status(500).json({
      message: error.message,
    })
  }
})

// RUTA: Para eliminar todas las publicaciones del usuario (backend)
router.delete(`${URL}/backend_all_submits/:imgs`, async (req, res) => {
  try {
    const { imgs } = req.params;
    const data = imgs.split(",");
    console.log("--------");
    console.log(data);
    console.log("--------");

    // SOLUCIONAR: Hasta el momento no encuentro una forma de decirle al backend que elimine todas las pbulicaciones del usuario

    data.forEach(imagen=>{
      const filePath = `uploads/submits/${imagen}`;
      fs.access(filePath, (error) => {
        if (!error) {
          fs.unlinkSync(filePath);
        } else {
          console.error("Error occured:", error);
        }
      });
    })

    res.json(data);

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
