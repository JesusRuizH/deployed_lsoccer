import { pool } from "../../../../config/db"

export default async function handler(req, res){
    
    switch (req.method) {
        case 'GET':
            return await getCategoria(req, res)
        case 'DELETE':
            return await deleteCategoria(req, res)
        case 'PUT':
            return await updateCategoria(req, res)
        default:
            break;
    }
    
}

const getCategoria = async (req, res) => {
    try {
        const {id} = req.query
        const [result] = await pool.query("SELECT PK_categoria, DATE_FORMAT(fecha_categoria_ini,'%Y-%m-%d') AS fecha_categoria_ini, DATE_FORMAT(fecha_categoria_fin,'%Y-%m-%d') AS fecha_categoria_fin, turno FROM categoria WHERE PK_categoria = ?", [id])
        return res.status(200).json(result[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deleteCategoria = async (req, res) => {
    try {
        const {id} = req.query
        await pool.query('delete from categoria where PK_categoria = ?', [id]) 
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const updateCategoria = async (req, res) => {
    const {id} = req.query
    const {fecha_categoria_ini, fecha_categoria_fin, turno,} = req.body
    try {
        await pool.query('UPDATE categoria SET fecha_categoria_ini = ? , fecha_categoria_fin = ? , turno = ? WHERE PK_categoria = ?' , [fecha_categoria_ini, fecha_categoria_fin, turno, id]);
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}