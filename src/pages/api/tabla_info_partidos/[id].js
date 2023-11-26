import { pool } from "../../../../config/db"

export default async function handler(req, res){
    
    switch (req.method) {
        case 'GET':
            return await getTabla_info_partidos(req, res)
        case 'DELETE':
            return await deleteTabla_info_partidos(req, res)
        case 'PUT':
            return await updateTabla_info_partidos(req, res)
        default:
            break;
    }
    
}

const getTabla_info_partidos = async (req, res) => {
    try {
        const {id} = req.query
        const [result] = await pool.query("SELECT PK_tabla_info_partidos, FK_categoria, DATE_FORMAT(fecha_partido,'%y-%m-%d') AS fecha_partido, incidentes, goles_favor, goles_contra, num_tarjetas_rojas, num_tarjetas_amarillas, resultado, datos_extra, nombre_encargado FROM tabla_info_partidos WHERE PK_tabla_info_partidos = ?", [id])
        return res.status(200).json(result[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deleteTabla_info_partidos = async (req, res) => {
    try {
        const {id} = req.query
        await pool.query('delete from tabla_info_partidos where PK_tabla_info_partidos = ?', [id]) 
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const updateTabla_info_partidos = async (req, res) => {
    const {id} = req.query
    const {FK_categoria ,fecha_partido , incidentes ,goles_favor ,goles_contra , num_tarjetas_rojas ,num_tarjetas_amarillas ,resultado , datos_extra , nombre_encargado } = req.body
    try {
        await pool.query('UPDATE tabla_info_partidos SET FK_categoria = ? , fecha_partido = ? , incidentes = ? , goles_favor = ? , goles_contra = ? , num_tarjetas_rojas = ? , num_tarjetas_amarillas = ? , resultado = ? , datos_extra = ? , nombre_encargado = ? WHERE PK_tabla_info_partidos = ?' , [FK_categoria ,fecha_partido , incidentes ,goles_favor ,goles_contra , num_tarjetas_rojas ,num_tarjetas_amarillas ,resultado , datos_extra , nombre_encargado, id]);
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}