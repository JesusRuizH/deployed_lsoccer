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
        const [result] = await pool.query("SELECT PK_tabla_info_partidos, FK_categoria, DATE_FORMAT(fecha_partido,'%y-%m-%d') AS fecha_partido, incidentes, goles_favor, goles_contra, num_tarjetas_rojas, num_tarjetas_amarillas, resultado, datos_extra, nombre_encargado FROM tabla_info_partidos")
        //console.log(result);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({error});
    }
}

const saveTabla_info_partidos = async (req, res)=>{
    try {
        const {FK_categoria ,fecha_partido , incidentes ,goles_favor ,goles_contra , num_tarjetas_rojas ,num_tarjetas_amarillas ,resultado , datos_extra , nombre_encargado } = req.body

        const [result] = await pool.query('INSERT INTO tabla_info_partidos SET ?', {FK_categoria ,fecha_partido , incidentes ,goles_favor ,goles_contra , num_tarjetas_rojas ,num_tarjetas_amarillas ,resultado , datos_extra , nombre_encargado })
        return res.status(200).json({FK_categoria ,fecha_partido , incidentes ,goles_favor ,goles_contra , num_tarjetas_rojas ,num_tarjetas_amarillas ,resultado , datos_extra , nombre_encargado, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

