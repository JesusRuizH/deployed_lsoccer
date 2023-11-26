import { pool } from "../../../../config/db"

export default async function handler(req, res){
    
    switch (req.method) {
        case 'GET':
            return await getContacto(req, res)
        case 'DELETE':
            return await deleteContacto(req, res)
        case 'PUT':
            return await updateContacto(req, res)
        default:
            break;
    }
    
}

const getContacto = async (req, res) => {
    try {
        const {id} = req.query
        const [result] = await pool.query("SELECT * FROM contacto_emergencia WHERE PK_contacto_emergencia = ?", [id])
        return res.status(200).json(result[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deleteContacto = async (req, res) => {
    try {
        const {id} = req.query
        await pool.query('delete from contacto_emergencia where PK_contacto_emergencia = ?', [id]) 
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const updateContacto = async (req, res) => {
    const {id} = req.query
    const {nombre_contacto, apellido_contacto, telefono_contacto, cel_contacto} = req.body
    try {
        await pool.query('UPDATE contacto_emergencia SET nombre_contacto = ? , apellido_contacto = ? , telefono_contacto = ?, cel_contacto = ? WHERE PK_contacto_emergencia = ?' , [nombre_contacto, apellido_contacto, telefono_contacto, cel_contacto, id]);
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}