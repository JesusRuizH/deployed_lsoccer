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
        const client = await pool.connect();
        const result = await client.query("SELECT pk_tabla_info_partidos, fk_categoria, TO_CHAR(fecha_partido, 'YYYY-MM-DD') AS fecha_partido, incidentes, goles_favor, goles_contra, num_tarjetas_rojas, num_tarjetas_amarillas, resultado, datos_extra, nombre_encargado FROM tabla_info_partidos WHERE pk_tabla_info_partidos = $1", [id])
        const tabla = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(tabla[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
}

const deleteTabla_info_partidos = async (req, res) => {
    try {
        const { id } = req.query;
        const client = await pool.connect();
        await client.query('DELETE FROM tabla_info_partidos WHERE pk_tabla_info_partidos = $1', [id]);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateTabla_info_partidos = async (req, res) => {
    const { id } = req.query;
    const {fk_categoria ,fecha_partido , incidentes ,goles_favor ,goles_contra , num_tarjetas_rojas ,num_tarjetas_amarillas ,resultado , datos_extra , nombre_encargado } = req.body
    try{
        const client = await pool.connect();
        await client.query('UPDATE tabla_info_partidos SET fk_categoria = $1, fecha_partido = $2, incidentes = $3, goles_favor = $4, goles_contra = $5, num_tarjetas_rojas = $6, num_tarjetas_amarillas = $7, resultado = $8, datos_extra = $9, nombre_encargado = $10 WHERE pk_tabla_info_partidos = $11', [fk_categoria ,fecha_partido , incidentes ,goles_favor ,goles_contra , num_tarjetas_rojas ,num_tarjetas_amarillas ,resultado , datos_extra , nombre_encargado, id]);
        return res.status(204).json();
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
}