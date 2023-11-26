import { pool } from "../../../../config/db"

export default async function handler(req, res){
    
    switch (req.method) {
        case 'GET':
            return await getJugadores(req, res)
        case 'DELETE':
            return await deleteJugadores(req, res)
        case 'PUT':
            return await updateJugadores(req, res)
        default:
            break;
    }
    
}

const getJugadores = async (req, res) => {
    try {
        const {id} = req.query
        const [result] = await pool.query("SELECT * FROM jugadores_equipos WHERE PK_jugadores = ?", [id])
        return res.status(200).json(result[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deleteJugadores = async (req, res) => {
    try {
        const {id} = req.query
        await pool.query('delete from jugadores_equipos where PK_jugadores = ?', [id]) 
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const updateJugadores = async (req, res) => {
    const {id} = req.query
    const {FK_equipo, nombre_jugador, posicion_jugador, jersey} = req.body
    try {
        await pool.query('UPDATE jugadores_equipos SET FK_equipo = ? , nombre_jugador = ? , posicion_jugador = ? , jersey = ? WHERE PK_jugadores = ?' , [FK_equipo, nombre_jugador, posicion_jugador, jersey, id]);
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}