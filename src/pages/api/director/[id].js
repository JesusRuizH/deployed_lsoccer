import { pool } from "../../../../config/db"

export default async function handler(req, res){
    
    switch (req.method) {
        case 'GET':
            return await getDirector(req, res)
        case 'DELETE':
            return await deleteDirector(req, res)
        case 'PUT':
            return await updateDirector(req, res)
        default:
            break;
    }
    
}

const getDirector = async (req, res) => {
    
    try {
        const {id} = req.query
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM director_deportivo WHERE fk_usuario = $1;", [id])
        const dire = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(dire[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
}

const deleteDirector = async (req, res) => {
    try {
        const { id } = req.query;
        const client = await pool.connect();
        await client.query('DELETE FROM director_deportivo WHERE fk_usuario = $1', [id]);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateDirector = async (req, res) => {
    const { id } = req.query;
    const {fk_usuario, nss} = req.body
    try{
        const client = await pool.connect();
        await client.query('UPDATE director_deportivo SET fk_usuario = $1, nss = $2 WHERE fk_usuario = $3;', [fk_usuario, nss, id]);
        return res.status(204).json();
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
}