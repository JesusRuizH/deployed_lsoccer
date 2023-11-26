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
        const [result] = await pool.query("SELECT * FROM equipos WHERE PK_equipo = ?", [id])
        return res.status(200).json(result[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deleteEquipos = async (req, res) => {
    try {
        const {id} = req.query
        await pool.query('delete from equipos where PK_equipo = ?', [id]) 
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const updateEquipos = async (req, res) => {
    const {id} = req.query
    const {nombre_equipo ,posicion_tabla, FK_liga} = req.body
    try {
        await pool.query('UPDATE equipos SET nombre_equipo = ? , posicion_tabla = ?, FK_liga = ? WHERE PK_equipo = ?' , [nombre_equipo ,posicion_tabla, FK_liga, id]);
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}