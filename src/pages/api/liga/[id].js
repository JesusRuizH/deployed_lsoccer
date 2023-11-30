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
        const client = await pool.connect();
        const result = await client.query("SELECT pk_liga, nombre_liga, TO_CHAR(fecha_categoria_ini, 'YYYY-MM-DD') AS fecha_categoria_ini, TO_CHAR(fecha_categoria_fin, 'YYYY-MM-DD') AS fecha_categoria_fin FROM liga WHERE pk_liga = $1", [id])
        const lig = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(lig[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
}

const deleteLiga = async (req, res) => {
    try {
        const { id } = req.query;
        const client = await pool.connect();
        await client.query('DELETE FROM liga WHERE pk_liga = $1', [id]);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateLiga = async (req, res) => {
    const { id } = req.query;
    const {nombre_liga, fecha_categoria_ini, fecha_categoria_fin} = req.body
    try{
        const client = await pool.connect();
        await client.query('UPDATE liga SET nombre_liga = $1, fecha_categoria_ini = $2, fecha_categoria_fin = $3 WHERE pk_liga = $4', [nombre_liga, fecha_categoria_ini, fecha_categoria_fin, id]);
        return res.status(204).json();
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
}