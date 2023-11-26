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
        const [result] = await pool.query("SELECT PK_eventos, FK_categoria, descripcion_evento, DATE_FORMAT(fecha_evento,'%y-%m-%d') AS fecha_evento, ubicacion_evento FROM eventos_importantes WHERE PK_eventos = ?", [id])
        return res.status(200).json(result[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deleteEventos = async (req, res) => {
    try {
        const {id} = req.query
        await pool.query('delete from eventos_importantes where PK_eventos = ?', [id]) 
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const updateEventos = async (req, res) => {
    const {id} = req.query
    const {FK_categoria, descripcion_evento, fecha_evento,ubicacion_evento} = req.body
    try {
        await pool.query('UPDATE eventos_importantes SET FK_categoria = ? , descripcion_evento = ? , fecha_evento = ?, ubicacion_evento = ? WHERE PK_eventos = ?' , [FK_categoria, descripcion_evento, fecha_evento,ubicacion_evento, id]);
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}