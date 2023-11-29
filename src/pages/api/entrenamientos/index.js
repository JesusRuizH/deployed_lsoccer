import { pool } from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getEntrenamientos(req, res);
        //si ees POST va a guardar el producto
        case 'POST':
            return await saveEntrenamientos(req,res)
    }
    
}

//funciones

const getEntrenamientos = async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM entrenamientos');
        const entrena = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(entrena);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
};


const saveEntrenamientos = async (req, res)=>{
    const client = await pool.connect();
    const {fk_categoria ,dias_entrenamiento, horarios_entrena_ini, horarios_entrena_fin} = req.body
    try {
        await client.query(
        'INSERT INTO entrenamientos (fk_categoria ,dias_entrenamiento, horarios_entrena_ini, horarios_entrena_fin) VALUES ($1, $2, $3, $4)',
        [fk_categoria ,dias_entrenamiento, horarios_entrena_ini, horarios_entrena_fin]
        );
        return res.status(200).json({fk_categoria ,dias_entrenamiento, horarios_entrena_ini, horarios_entrena_fin, id: result.insertId})
    } catch {
        return res.status(500).json({ error: error.message });
    }
}

