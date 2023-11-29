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
        const result = await client.query('SELECT pk_usuario, nombre_usuario, apellidos_usuario, cate_uno, cate_dos, cate_tres FROM usuario, profesor, cate_asignadas WHERE (pk_usuario = fk_usuario) AND (fk_cate_asignadas = pk_cate_asignadas)');
        const eve = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(eve);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
};