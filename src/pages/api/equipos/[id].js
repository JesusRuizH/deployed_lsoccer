import { pool } from "../../../../config/db"

export default async function handler(req, res){
    
    switch (req.method) {
        case 'GET':
            return await getEquipos(req, res)
        case 'DELETE':
            return await deleteEquipos(req, res)
        case 'PUT':
            return await updateEquipos(req, res)
        default:
            break;
    }
    
}

const getEquipos = async (req, res) => {
    
    try {
        const {id} = req.query
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM equipos WHERE pk_equipo = $1", [id])
        const equi = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(equi[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
}

const deleteEquipos = async (req, res) => {
    try {
        const { id } = req.query;
        const client = await pool.connect();
        await client.query('DELETE FROM equipos WHERE pk_equipo = $1', [id]);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateEquipos = async (req, res) => {
    const { id } = req.query;
    const {nombre_equipo ,posicion_tabla, fk_liga} = req.body
    try{
        const client = await pool.connect();
        await client.query('UPDATE equipos SET nombre_equipo = $1, posicion_tabla = $2, fk_liga = $3 WHERE pk_equipo = $4', [nombre_equipo ,posicion_tabla, fk_liga, id]);
        return res.status(204).json();
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
}