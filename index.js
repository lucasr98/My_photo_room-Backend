import express from "express";
import { PORT } from "./config.js";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import usersDbRouter from "./routes/users_db.routes.js";
import usersBackendRouter from "./routes/users_backend.routes.js";
import imagesDbRouter from "./routes/images_db.routes.js";
import imagesBackendRouter from "./routes/images_backend.routes.js"

var app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());

app.use(cors({ origin: "*" }));

// Ruta para guardar las imágenes
app.use("/uploads/profiles", express.static(join(__dirname, "uploads/profiles")));
app.use("/uploads/submits", express.static(join(__dirname, "uploads/submits")));

app.use(usersDbRouter);
app.use(usersBackendRouter);
app.use(imagesDbRouter);
app.use(imagesBackendRouter);

app.listen(PORT, () => {
  console.log(`Server en: http://localhost:${PORT}/`);
  console.log(__dirname)
});