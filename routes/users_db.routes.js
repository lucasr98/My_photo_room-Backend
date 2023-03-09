import { Router } from "express";
import { URL } from "../config.js";
import pool, { usuarios, publicaciones } from "../db.js";

const router = Router();

// RUTA: Para registrarse (base de datos)
router.post(`${URL}/database_account`, async (req, res) => {
  function capitalizarLetra(param) {
    return param.charAt(0).toUpperCase() + param.slice(1).toLowerCase();
  }
  try {
    const { user, password, email, name, lastName, genre, age } = req.body;
    console.log(req.body);
    const [verify] = await pool.query(
      `SELECT user FROM ${usuarios} where user = ?`,
      [user]
    );
    if (verify.length !== 0) {
      return res.json({
        message: "Ya existe una cuenta con ese nombre de usuario.",
      });
    }
    const [result] = await pool.query(
      `INSERT INTO ${usuarios}(user, password, email, name, lastName, genre, age, image, imageName) VALUES(?, ?, ?, ?, ?, ?, ?, "", "")`,
      [
        user,
        password,
        email,
        capitalizarLetra(name),
        capitalizarLetra(lastName),
        genre,
        age,
      ]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// RUTA: Para cargar datos de un usuario (base de datos)
router.get(`${URL}/database_user/:user`, async (req, res) => {
  try {
    console.log(req.params.user);
    const [result] = await pool.query(`SELECT * FROM ${usuarios} WHERE user = ?`, [
      req.params.user,
    ]);
    console.log(result[0]);
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// RUTA: Para eliminar cuenta (base de datos)
router.delete(`${URL}/database_account/:user`, async (req, res) => {
  try {
    const result = await pool.query(`DELETE FROM ${usuarios} WHERE user = ?`, [
      req.params.user,
    ]);
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// RUTA: Para iniciar sesión (base de datos)
router.get(`${URL}/database_account/:user/:password`, async (req, res) => {
  console.log(req.params);
  try {
    const { user, password } = req.params;
    const [result] = await pool.query(
      `SELECT * FROM ${usuarios} WHERE user = ? AND password = ?`,
      [user, password]
    );
    console.log(result);
    if (result.length === 0) {
      return res.json({
        message: "Los datos que ingresaste no son correctos.",
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// RUTA: Para obtener imágen de perfil (base de datos)
router.get(`${URL}/database_profile/:user`, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT image FROM ${usuarios} WHERE user = ?`,
      [req.params.user]
    );
    console.log(result[0][0].image);
    res.json(result[0][0].image);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// RUTA: Para subir/eliminar imágen de perfil (base de datos)
router.put(`${URL}/database_profile`, async (req, res) => {
  try {
    const { image, imgName, user } = req.body;
    const [result] = await pool.query(
      `UPDATE ${usuarios} SET image = ?, imageName = ? WHERE user = ?`,
      [image, imgName, user]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
