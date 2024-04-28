import { pool } from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getData(req, res);
        //si ees POST va a guardar el producto
    }
    
}

//funciones
const getData = async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT 'Categoria ' || CAST(fk_categoria AS VARCHAR) AS name, num_tarjetas_amarillas AS value from tabla_info_partidos;");
        const adm = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(adm);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
};