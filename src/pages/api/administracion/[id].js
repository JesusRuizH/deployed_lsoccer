import { pool } from "../../../../config/db"

export default async function handler(req, res){
    
    switch (req.method) {
        case 'GET':
            return await getAdministracion(req, res)
        case 'DELETE':
            return await deleteAdministracion(req, res)
        case 'PUT':
            return await updateAdministracion(req, res)
        default:
            break;
    }
    
}
const getAdministracion = async (req, res) => {
    
    try {
        const {id} = req.query
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM administracion WHERE fk_usuario = $1;", [id])
        const administracion = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(administracion[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
}

const deleteAdministracion = async (req, res) => {
    try {
        const { id } = req.query;
        const client = await pool.connect();
        await client.query('DELETE FROM administracion WHERE fk_usuario = $1', [id]);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateAdministracion = async (req, res) => {
    const { id } = req.query;
    const {fk_usuario, nss} = req.body
    try{
        const client = await pool.connect();
        await client.query('UPDATE administracion SET fk_usuario = $1, nss = $2 WHERE fk_usuario = $3;', [fk_usuario, nss, id]);
        return res.status(204).json();
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
}