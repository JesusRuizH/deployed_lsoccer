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
        const client = await pool.connect();
        const result = await client.query("SELECT pk_recibo, key_cuenta_pago, monto_pagado, imagen_pago, TO_CHAR(fecha_pago, 'YYYY-MM-DD') AS fecha_pago, observaciones, validacion FROM recibo WHERE pk_recibo = $1", [id])
        const rec = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(rec[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
}

const deleteRecibo = async (req, res) => {
    try {
        const { id } = req.query;
        const client = await pool.connect();
        await client.query('DELETE FROM recibo WHERE pk_recibo = $1', [id]);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateRecibo = async (req, res) => {
    const { id } = req.query;
    const {key_cuenta_pago,monto_pagado, imagen_pago, fecha_pago, observaciones, validacion} = req.body
    try{
        const client = await pool.connect();
        await client.query('UPDATE recibo SET key_cuenta_pago = $1, monto_pagado = $2, imagen_pago = $3, fecha_pago = $4, observaciones = $5, validacion = $6 WHERE pk_recibo = $7', [key_cuenta_pago,monto_pagado, imagen_pago, fecha_pago, observaciones, validacion, id]);
        return res.status(204).json();
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
}