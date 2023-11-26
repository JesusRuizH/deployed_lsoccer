import { pool } from "../../../../config/db"

export default async function handler(req, res){
    
    switch (req.method) {
        case 'GET':
            return await getLiga(req, res)
        case 'DELETE':
            return await deleteLiga(req, res)
        case 'PUT':
            return await updateLiga(req, res)
        default:
            break;
    }
    
}

const getLiga = async (req, res) => {
    try {
        const {id} = req.query
        const [result] = await pool.query("SELECT PK_liga, nombre_liga, DATE_FORMAT(fecha_categoria_ini,'%y-%m-%d') AS fecha_categoria_ini, DATE_FORMAT(fecha_categoria_fin,'%y-%m-%d') AS fecha_categoria_fin FROM liga WHERE PK_liga = ?", [id])
        return res.status(200).json(result[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deleteLiga = async (req, res) => {
    try {
        const {id} = req.query
        await pool.query('delete from liga where PK_liga = ?', [id]) 
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const updateLiga = async (req, res) => {
    const {id} = req.query
    const {nombre_liga, fecha_categoria_ini, fecha_categoria_fin,} = req.body
    try {
        await pool.query('UPDATE liga SET nombre_liga = ? , fecha_categoria_ini = ? , fecha_categoria_fin = ? WHERE PK_liga = ?' , [nombre_liga, fecha_categoria_ini, fecha_categoria_fin, id]);
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}