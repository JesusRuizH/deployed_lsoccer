import { pool } from "../../../../config/db"

export default async function handler(req, res){
    
    switch (req.method) {
        case 'GET':
            return await getDirector(req, res)
        case 'DELETE':
            return await deleteDirector(req, res)
        case 'PUT':
            return await updateDirector(req, res)
        default:
            break;
    }
    
}

const getDirector = async (req, res) => {
    try {
        const {id} = req.query
        const [result] = await pool.query("SELECT * FROM director_deportivo WHERE FK_usuario = ?", [id])
        return res.status(200).json(result[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deleteDirector = async (req, res) => {
    try {
        const {id} = req.query
        await pool.query('delete from director_deportivo where FK_usuario = ?', [id]) 
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const updateDirector = async (req, res) => {
    const {id} = req.query
    const {FK_usuario, NSS} = req.body
    try {
        await pool.query('UPDATE director_deportivo SET FK_usuario = ? , NSS = ? WHERE FK_usuario = ?' , [FK_usuario, NSS, id]);
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}