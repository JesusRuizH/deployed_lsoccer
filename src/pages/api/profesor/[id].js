import { pool } from "../../../../config/db"

export default async function handler(req, res){
    
    switch (req.method) {
        case 'GET':
            return await getProfesor(req, res)
        case 'DELETE':
            return await deleteProfesor(req, res)
        case 'PUT':
            return await updateProfesor(req, res)
        default:
            break;
    }
    
}

const getProfesor = async (req, res) => {
    
    try {
        const {id} = req.query
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM profesor WHERE fk_usuario = $1", [id])
        const profesor = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(profesor[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
}

const deleteProfesor = async (req, res) => {
    try {
        const { id } = req.query;
        const client = await pool.connect();
        await client.query('DELETE FROM profesor WHERE fk_usuario = $1', [id]);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateProfesor = async (req, res) => {
    const { id } = req.query;
    const {fk_cate_asignadas} = req.body
    try{
        const client = await pool.connect();
        await client.query('UPDATE profesor SET fk_cate_asignadas = $1 WHERE fk_usuario = $2', [fk_cate_asignadas, id]);
        return res.status(204).json();
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
}