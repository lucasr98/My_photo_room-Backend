import { Router } from "express";
import { URL } from "../config.js";
import multer from "multer";
import fs from "fs";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profiles");
  },
  filename: (req, file, cb) => {
    const user = req.params.user;
    cb(null, `${user}__${file.originalname}`);
  },
});

const upload = multer({ storage });

// RUTA: Para guardar imágen de perfil (backend)
router.post(`${URL}/backend_profile/:user`, upload.single("file"), (req, res, next) => {
  const file = req.file;
  //file.name = user + file.name.substring(file.name.length - 4, file.name.length)
  if (!file) {
    const error = new Error("No hay archivos");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

// RUTA: Para eliminar imágen de perfil (backend)
router.delete(`${URL}/backend_profile/:image`, async (req, res) => {
  try {
    const filePath = `uploads/profiles/${req.params.image}`;
    fs.access(filePath, (error) => {
      if (!error) {
        fs.unlinkSync(filePath);
      } else {
        console.error("Error occured:", error);
      }
    });
    console.log(req.params.image);
    res.json(`${req.params.image} eliminada con exito del backend.`);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export default router;