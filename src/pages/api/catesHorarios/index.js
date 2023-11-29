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
        const client = await pool.connect();
        const result = await client.query("SELECT pk_categoria, dias_entrenamiento, horarios_entrena_ini, horarios_entrena_fin, TO_CHAR(fecha_categoria_ini, 'YYYY-MM-DD') AS fecha_categoria_ini, TO_CHAR(fecha_categoria_fin, 'YYYY-MM-DD') AS fecha_categoria_fin, turno FROM  categoria, entrenamientos WHERE pk_categoria = fk_categoria;");
        const cat = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(cat);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 

};