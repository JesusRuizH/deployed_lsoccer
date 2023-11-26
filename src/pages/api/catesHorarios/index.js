import { pool } from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getCategoria(req, res);
    }
    
}

//funciones
const getCategoria = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT PK_categoria, dias_entrenamiento, horarios_entrena_ini, horarios_entrena_fin, DATE_FORMAT(fecha_categoria_ini,'%Y-%m-%d') AS fecha_categoria_ini, DATE_FORMAT(fecha_categoria_fin,'%Y-%m-%d') AS fecha_categoria_fin, turno FROM categoria, entrenamientos WHERE (PK_categoria = FK_categoria)")
        //console.log(result);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({error});
    }
}
