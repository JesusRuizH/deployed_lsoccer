import { pool } from "../../../../config/db"

export default async function handler(req, res){
    
    switch (req.method) {
        case 'GET':
            return await getAlumno(req, res)
        case 'DELETE':
            return await deleteAlumno(req, res)
        case 'PUT':
            return await updateAlumno(req, res)
        default:
            break;
    }
    
}

const getAlumno = async (req, res) => {
    try {
        const {id} = req.query
        const [result] = await pool.query("SELECT * FROM alumno WHERE FK_usuario = ?", [id])
        return res.status(200).json(result[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deleteAlumno = async (req, res) => {
    try {
        const {id} = req.query
        await pool.query('delete from alumno where FK_usuario = ?', [id]) 
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const updateAlumno = async (req, res) => {
    const {id} = req.query
    const {FK_usuario, FK_categoria, posicion_jugador, pago_mensual, pago_liga, jersey, KEY_cuenta_pago} = req.body
    try {
        await pool.query('UPDATE alumno SET FK_usuario = ? ,FK_categoria = ? ,posicion_jugador = ? ,pago_mensual = ? , pago_liga = ? , jersey = ?, KEY_cuenta_pago = ? WHERE FK_usuario = ?' , [FK_usuario, FK_categoria, posicion_jugador,pago_mensual,pago_liga,jersey,KEY_cuenta_pago, id]);
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}