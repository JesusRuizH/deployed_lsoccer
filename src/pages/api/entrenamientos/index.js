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
        const [result] = await pool.query('SELECT * FROM entrenamientos')
        //console.log(result);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({error});
    }
}

const saveEntrenamientos = async (req, res)=>{
    try {
        const {FK_categoria ,dias_entrenamiento, horarios_entrena_ini, horarios_entrena_fin} = req.body

        const [result] = await pool.query('INSERT INTO entrenamientos SET ?', {FK_categoria ,dias_entrenamiento, horarios_entrena_ini, horarios_entrena_fin})
        return res.status(200).json({FK_categoria ,dias_entrenamiento, horarios_entrena_ini, horarios_entrena_fin, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

