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
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM tipo_cuenta WHERE pk_tipo_cuenta = $1", [id])
        const cuenta = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(cuenta[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
}

const deleteTipo_cuenta = async (req, res) => {
    try {
        const { id } = req.query;
        const client = await pool.connect();
        await client.query('DELETE FROM tipo_cuenta WHERE pk_tipo_cuenta = $1', [id]);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateTipo_cuenta = async (req, res) => {
    const { id } = req.query;
    const {tipo} = req.body
    try{
        const client = await pool.connect();
        await client.query('UPDATE tipo_cuenta SET tipo = $1 WHERE pk_tipo_cuenta = $2', [tipo, id]);
        return res.status(204).json();
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
}