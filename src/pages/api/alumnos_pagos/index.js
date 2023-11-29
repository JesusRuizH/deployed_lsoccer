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
        const client = await pool.connect();
        const result = await client.query('SELECT nombre_usuario, apellidos_usuario, fk_usuario, fk_categoria, pago_mensual, pago_liga, key_cuenta_pago FROM usuario, alumno WHERE (pk_usuario = fk_usuario)');
        const alumnos_pag = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(alumnos_pag);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
};