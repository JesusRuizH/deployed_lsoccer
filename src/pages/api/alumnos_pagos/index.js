import { pool } from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getEventos(req, res);
        //si ees POST va a guardar el producto
    }
    
}

//funciones
const getEventos = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT nombre_usuario, apellidos_usuario, FK_usuario, FK_categoria, pago_mensual, pago_liga, KEY_cuenta_pago FROM usuario, alumno WHERE (PK_usuario = FK_usuario)")
        //console.log(result);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({error});
    }
}
