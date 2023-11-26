import { pool } from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getRecibo(req, res);
        //si ees POST va a guardar el producto
        case 'POST':
            return await saveRecibo(req,res)
    }
    
}

//funciones
const getRecibo = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT PK_recibo, KEY_cuenta_pago, monto_pagado, imagen_pago, DATE_FORMAT(fecha_pago,'%y-%m-%d') AS fecha_pago, observaciones, validacion FROM recibo")
        //console.log(result);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({error});
    }
}

const saveRecibo = async (req, res)=>{
    try {
        const {KEY_cuenta_pago,monto_pagado, imagen_pago, fecha_pago, observaciones, validacion,} = req.body

        const [result] = await pool.query('INSERT INTO recibo SET ?', {KEY_cuenta_pago,monto_pagado, imagen_pago, fecha_pago, observaciones, validacion})
        return res.status(200).json({KEY_cuenta_pago,monto_pagado, imagen_pago, fecha_pago, observaciones, validacion, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

