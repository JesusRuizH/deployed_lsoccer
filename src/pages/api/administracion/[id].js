import { pool } from "../../../../config/db"

export default async function handler(req, res){
    
    switch (req.method) {
        case 'GET':
            return await getAdministracion(req, res)
        case 'DELETE':
            return await deleteAdministracion(req, res)
        case 'PUT':
            return await updateAdministracion(req, res)
        default:
            break;
    }
    
}

const getAdministracion = async (req, res) => {
    try {
        const {id} = req.query
        const [result] = await pool.query("SELECT * FROM administracion WHERE FK_usuario = ?", [id])
        return res.status(200).json(result[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deleteAdministracion = async (req, res) => {
    try {
        const {id} = req.query
        await pool.query('delete from administracion where FK_usuario = ?', [id]) 
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const updateAdministracion = async (req, res) => {
    const {id} = req.query
    const {FK_usuario, NSS,} = req.body
    try {
        await pool.query('UPDATE administracion SET FK_usuario = ? , NSS = ? WHERE FK_usuario = ?' , [FK_usuario, NSS, id]);
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}