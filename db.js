import { createPool } from "mysql2/promise";

export const usuarios = "mpr_usuarios"; // "usuarios" | "mpr_usuarios"
export const publicaciones = "mpr_submits"; // "publicaciones" | "mpr_submits"

const localDB = {
  host: "localhost",
  user: "root",
  password: "",
  database: "my_photo_room",
};

const planetScaleDB = {
  database: "form_express",
  user: "iqihoiyckf0zixnh071l",
  host: "us-east.connect.psdb.cloud",
  password: "pscale_pw_Ds8yd1C5daJWJznsPhlpjWQ0GuDEBwBjKkT3cb41LzG",
  ssl: {
    rejectUnauthorized: false
  }
}

const pool = createPool(planetScaleDB);

export default pool;