import { pool } from "../../../../config/db"

export default async function handler(req, res){
    
    switch (req.method) {
        case 'GET':
            return await getEntrenamientos(req, res)
        case 'DELETE':
            return await deleteEntrenamientos(req, res)
        case 'PUT':
            return await updateEntrenamientos(req, res)
        default:
            break;
    }
    
}

const getEntrenamientos = async (req, res) => {
    
    try {
        const {id} = req.query
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM entrenamientos WHERE pk_entrenamientos = $1", [id])
        const entrena = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(entrena[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
}

const deleteEntrenamientos = async (req, res) => {
    try {
        const { id } = req.query;
        const client = await pool.connect();
        await client.query('DELETE FROM entrenamientos WHERE pk_entrenamientos = $1', [id]);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateEntrenamientos = async (req, res) => {
    const { id } = req.query;
    const {fk_categoria ,dias_entrenamiento, horarios_entrena_ini, horarios_entrena_fin} = req.body
    try{
        const client = await pool.connect();
        await client.query('UPDATE entrenamientos SET fk_categoria = $1, dias_entrenamiento = $2, horarios_entrena_ini = $3, horarios_entrena_fin = $4 WHERE pk_entrenamientos = $5', [fk_categoria ,dias_entrenamiento, horarios_entrena_ini, horarios_entrena_fin, id]);
        return res.status(204).json();
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
}
