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
        const result = await client.query("SELECT pk_usuario, nombre_usuario, apellidos_usuario,TO_CHAR(fecha_naci_usuario, 'YYYY-MM-DD') AS fecha_naci_usuario, correo, estado FROM usuario WHERE (fk_tipo_cuenta = 2)");
        const dire = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(dire);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
};