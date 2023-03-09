import express from "express";
import { PORT } from "./config.js";
import cors from "cors";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import fileUpload from "express-fileupload";

import usersDbRouter from "./routes/users_db.routes.js";
import usersBackendRouter from "./routes/users_backend.routes.js";
import usersCloudinaryRouter from "./routes/users_cloudinary.routes.js"

import imagesDbRouter from "./routes/images_db.routes.js";
import imagesBackendRouter from "./routes/images_backend.routes.js";
import imagesCloudinaryRouter from "./routes/images_cloudinary.routes.js";

var app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, '/uploads/')
}));

// Ruta para guardar las imágenes
app.use("/uploads/profiles", express.static(join(__dirname, "uploads/profiles")));
app.use("/uploads/submits", express.static(join(__dirname, "uploads/submits")));

app.use(usersDbRouter);
app.use(usersBackendRouter);
app.use(usersCloudinaryRouter);
app.use(imagesDbRouter);
app.use(imagesBackendRouter);
app.use(imagesCloudinaryRouter);

app.listen(PORT, () => {
  console.log(`Server en: http://localhost:${PORT}/`);
});