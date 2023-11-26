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
        const [result] = await pool.query("SELECT * FROM entrenamientos WHERE PK_entrenamientos = ?", [id])
        return res.status(200).json(result[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deleteEntrenamientos = async (req, res) => {
    try {
        const {id} = req.query
        await pool.query('delete from entrenamientos where PK_entrenamientos = ?', [id]) 
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const updateEntrenamientos = async (req, res) => {
    const {id} = req.query
    const {FK_categoria ,dias_entrenamiento, horarios_entrena_ini, horarios_entrena_fin} = req.body
    try {
        await pool.query('UPDATE entrenamientos SET FK_categoria = ? , dias_entrenamiento = ? , horarios_entrena_ini = ?, horarios_entrena_fin = ? WHERE PK_entrenamientos = ?' , [FK_categoria ,dias_entrenamiento, horarios_entrena_ini, horarios_entrena_fin, id]);
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}