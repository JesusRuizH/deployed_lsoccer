import { pool } from "../../../../config/db"

export default async function handler(req, res){
    
    switch (req.method) {
        case 'GET':
            return await getEventos(req, res)
        case 'DELETE':
            return await deleteEventos(req, res)
        case 'PUT':
            return await updateEventos(req, res)
        default:
            break;
    }
    
}
const getEventos = async (req, res) => {
    
    try {
        const {id} = req.query
        const client = await pool.connect();
        const result = await client.query("SELECT pk_eventos, fk_categoria, descripcion_evento, TO_CHAR(fecha_evento, 'YY-MM-DD') AS fecha_evento, ubicacion_evento FROM eventos_importantes WHERE pk_eventos = $1", [id])
        const eve = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(eve[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
}

const deleteEventos = async (req, res) => {
    try {
        const { id } = req.query;
        const client = await pool.connect();
        await client.query('DELETE FROM eventos_importantes WHERE pk_eventos = $1', [id]);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateEventos = async (req, res) => {
    const { id } = req.query;
    const {fk_categoria, descripcion_evento, fecha_evento, ubicacion_evento} = req.body
    try{
        const client = await pool.connect();
        await client.query('UPDATE eventos_importantes SET fk_categoria = $1, descripcion_evento = $2, fecha_evento = $3, ubicacion_evento = $4 WHERE pk_eventos = $5', [fk_categoria, descripcion_evento, fecha_evento,ubicacion_evento, id]);
        return res.status(204).json();
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
}