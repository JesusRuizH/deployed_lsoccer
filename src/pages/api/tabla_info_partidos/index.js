import { pool } from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getTabla_info_partidos(req, res);
        //si ees POST va a guardar el producto
        case 'POST':
            return await saveTabla_info_partidos(req,res)
    }
    
}

//funciones
const getTabla_info_partidos = async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT pk_tabla_info_partidos, fk_categoria, TO_CHAR(fecha_partido, 'YY-MM-DD') AS fecha_partido, incidentes, goles_favor, goles_contra, num_tarjetas_rojas, num_tarjetas_amarillas, resultado, datos_extra, nombre_encargado FROM tabla_info_partidos;");
        const tabla = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(tabla);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
};

const saveTabla_info_partidos = async (req, res)=>{
    const client = await pool.connect();
    const {fk_categoria ,fecha_partido , incidentes ,goles_favor ,goles_contra , num_tarjetas_rojas ,num_tarjetas_amarillas ,resultado , datos_extra , nombre_encargado } = req.body
    try {
        const result = await client.query(
        'INSERT INTO tabla_info_partidos (fk_categoria ,fecha_partido , incidentes ,goles_favor ,goles_contra , num_tarjetas_rojas ,num_tarjetas_amarillas ,resultado , datos_extra , nombre_encargado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
        [fk_categoria ,fecha_partido , incidentes ,goles_favor ,goles_contra , num_tarjetas_rojas ,num_tarjetas_amarillas ,resultado , datos_extra , nombre_encargado ]
        );
        return res.status(200).json({fk_categoria ,fecha_partido , incidentes ,goles_favor ,goles_contra , num_tarjetas_rojas ,num_tarjetas_amarillas ,resultado , datos_extra , nombre_encargado , id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
       
}
