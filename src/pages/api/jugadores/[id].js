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
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM jugadores_equipos WHERE pk_jugadores = $1", [id])
        const juga_equi = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(juga_equi[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
}

const deleteJugadores = async (req, res) => {
    try {
        const { id } = req.query;
        const client = await pool.connect();
        await client.query('DELETE FROM jugadores_equipos WHERE pk_jugadores = $1', [id]);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateJugadores = async (req, res) => {
    const { id } = req.query;
    const {fk_equipo, nombre_jugador, posicion_jugador, jersey} = req.body
    try{
        const client = await pool.connect();
        await client.query('UPDATE jugadores_equipos SET fk_equipo = $1, nombre_jugador = $2, posicion_jugador = $3, jersey = $4 WHERE pk_jugadores = $5', [fk_equipo, nombre_jugador, posicion_jugador, jersey, id]);
        return res.status(204).json();
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
}