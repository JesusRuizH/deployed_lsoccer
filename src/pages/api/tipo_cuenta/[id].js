import { pool } from "../../../../config/db"

export default async function handler(req, res){
    
    switch (req.method) {
        case 'GET':
            return await getTipo_cuenta(req, res)
        case 'DELETE':
            return await deleteTipo_cuenta(req, res)
        case 'PUT':
            return await updateTipo_cuenta(req, res)
        default:
            break;
    }
    
}

const getTipo_cuenta = async (req, res) => {
    try {
        const {id} = req.query
        const [result] = await pool.query("SELECT * FROM tipo_cuenta WHERE PK_tipo_cuenta = ?", [id])
        return res.status(200).json(result[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deleteTipo_cuenta = async (req, res) => {
    try {
        const {id} = req.query
        await pool.query('delete from tipo_cuenta where PK_tipo_cuenta = ?', [id]) 
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const updateTipo_cuenta = async (req, res) => {
    const {id} = req.query
    const {tipo} = req.body
    try {
        await pool.query('UPDATE tipo_cuenta SET tipo = ? WHERE PK_tipo_cuenta = ?' , [tipo, id]);
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}