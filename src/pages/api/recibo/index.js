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
        const client = await pool.connect();
        const result = await client.query("SELECT pk_recibo, key_cuenta_pago, monto_pagado, imagen_pago, TO_CHAR(fecha_pago, 'YY-MM-DD') AS fecha_pago, observaciones, validacion FROM recibo;");
        const rec = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(rec);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
};

const saveRecibo = async (req, res)=>{
    const client = await pool.connect();
    const {key_cuenta_pago, monto_pagado, imagen_pago, fecha_pago, observaciones, validacion,} = req.body
    try {
        const result = await client.query(
        'INSERT INTO recibo (key_cuenta_pago ,monto_pagado, imagen_pago, fecha_pago, observaciones, validacion) VALUES ($1, $2, $3, $4, $5, $6)',
        [key_cuenta_pago,monto_pagado, imagen_pago, fecha_pago, observaciones, validacion]
        );
        return res.status(200).json({key_cuenta_pago, monto_pagado, imagen_pago, fecha_pago, observaciones, validacion, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
       
}
