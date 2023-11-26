import { pool } from "../../../../config/db"

export default async function handler(req, res){
    
    switch (req.method) {
        case 'GET':
            return await getProfesor(req, res)
        case 'DELETE':
            return await deleteProfesor(req, res)
        case 'PUT':
            return await updateProfesor(req, res)
        default:
            break;
    }
    
}

const getProfesor = async (req, res) => {
    try {
        const {id} = req.query
        const [result] = await pool.query("SELECT * FROM profesor WHERE FK_usuario = ?", [id])
        return res.status(200).json(result[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deleteProfesor = async (req, res) => {
    try {
        const {id} = req.query
        await pool.query('delete from profesor where FK_usuario = ?', [id]) 
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const updateProfesor = async (req, res) => {
    const {id} = req.query
    const {FK_cate_asignadas} = req.body
    try {
        await pool.query('UPDATE profesor SET FK_cate_asignadas = ? WHERE FK_usuario = ?' , [FK_cate_asignadas, id]);
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}