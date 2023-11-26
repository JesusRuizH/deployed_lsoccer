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
        const [result] = await pool.query("SELECT PK_usuario, nombre_usuario, apellidos_usuario, DATE_FORMAT(fecha_naci_usuario,'%Y-%m-%d') AS fecha_naci_usuario, correo, estado FROM usuario WHERE (FK_tipo_cuenta = 3)")
        //console.log(result);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({error});
    }
}
