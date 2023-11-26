import { pool } from "../../../../config/db"

export default async function handler(req, res){
    
    switch (req.method) {
        case 'GET':
            return await getRecibo(req, res)
        case 'DELETE':
            return await deleteRecibo(req, res)
        case 'PUT':
            return await updateRecibo(req, res)
        default:
            break;
    }
    
}

const getRecibo = async (req, res) => {
    try {
        const {id} = req.query
        const [result] = await pool.query("SELECT PK_recibo, KEY_cuenta_pago, monto_pagado, imagen_pago, DATE_FORMAT(fecha_pago,'%y-%m-%d') AS fecha_pago, observaciones, validacion FROM recibo WHERE PK_recibo = ?", [id])
        return res.status(200).json(result[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deleteRecibo = async (req, res) => {
    try {
        const {id} = req.query
        await pool.query('delete from recibo where PK_recibo = ?', [id]) 
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const updateRecibo = async (req, res) => {
    const {id} = req.query
    const {KEY_cuenta_pago,monto_pagado, imagen_pago, fecha_pago, observaciones, validacion} = req.body
    try {
        await pool.query('UPDATE recibo SET KEY_cuenta_pago = ? , monto_pagado = ?, imagen_pago = ? , fecha_pago = ? , observaciones = ?, validacion = ? WHERE PK_recibo = ?' , [KEY_cuenta_pago,monto_pagado, imagen_pago, fecha_pago, observaciones, validacion, id]);
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}