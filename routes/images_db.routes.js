import { Router } from "express";
import { URL } from "../config.js";
import pool, { usuarios, publicaciones } from "../db.js";

const router = Router();

// RUTA: Para obtener todas las publicaciones de todos los usuarios (base de datos)
router.get(`${URL}/database_all_submits/:page`, async (req, res)=>{
    try{
        const range = 5;
        const selector = (parseInt(req.params.page, "10") * range);
        const [ result ] = await pool.query(`SELECT * FROM ${publicaciones} ORDER BY id DESC LIMIT ${range} OFFSET ?`, [
            selector
        ])
        res.json(result)
    }
    catch(error){
        return res.status(500).json({
            message: error.message,
        })
    }
})

// RUTA: Para obtener una publicación (base de datos)
router.get(`${URL}/database_submit/:image`, async (req, res)=>{
    try{
        const [ result ] = await pool.query(`SELECT * FROM ${publicaciones} WHERE image = ?`, [
            req.params.image
        ])
        console.log(result);
        res.json(result[0]);
    }
    catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
})

// RUTA: Para guardar una publicación (base de datos)
router.post(`${URL}/database_submit`, async (req, res)=>{
    try{
        const { userRef, title, content, image, date } = req.body;
        const [ result ] = await pool.query(`INSERT INTO ${publicaciones}(userRef, title, content, image, date) VALUES(?, ?, ?, ?, ?)`, [
            userRef,
            title,
            content,
            image,
            date
        ])
        console.log(result);
        res.json(result);
    }
    catch(error){
        return res.status(500).json({
            message: error.message,
        });
    }
})

// RUTA: Para eliminar una publicación (base de datos)
router.delete(`${URL}/database_submit/:id`, async (req, res)=>{
    try{
        const [ result ] = await pool.query(`DELETE FROM ${publicaciones} WHERE id = ?`, [
            req.params.id
        ]);
        console.log(result);
        res.json(result);
    }
    catch(error){
        return res.status(500).json({
            message: error.message,
        });
    }
})

// RUTA: Para obtener todas las publicaciones del usuario (base de datos)
router.get(`${URL}/database_submits/:user/:page`, async (req, res)=>{
    try{
        const range = 5;
        const selector = (parseInt(req.params.page, "10") * range);
        const [ result ] = await pool.query(`SELECT * FROM ${publicaciones} WHERE userRef = ? ORDER BY id DESC LIMIT ${range} OFFSET ?`, [
            req.params.user,
            selector
        ])
        console.log(result);
        res.json(result);
    }
    catch(error){
        return res.status(500).json({
            message: error.message,
        });
    }
})

// RUTA: Para eliminar todas las publicaciones del usuario (base de datos)
router.delete(`${URL}/database_submits/:user`, async (req, res)=>{
    try{
        const submitsData = await pool.query(
          `SELECT image FROM ${publicaciones} WHERE userRef = ?`,
          [req.params.user]
        );
        const submitsData2 = submitsData[0].map((objeto) => {
          return objeto.image;
        });
        const [ result ] = await pool.query(`DELETE FROM ${publicaciones} WHERE userRef = ?`, [
            req.params.user
        ])
        console.log(result);
        res.json(submitsData2);
    }
    catch(error){
        return res.status(500).json({
            message: error.message,
        });
    }
})

export default router;