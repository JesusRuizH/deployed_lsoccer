import { pool } from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getEventos(req, res);
        //si ees POST va a guardar el producto
        case 'POST':
            return await saveEventos(req,res)
    }
    
}

//funciones
const getEventos = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT PK_eventos, FK_categoria, descripcion_evento, DATE_FORMAT(fecha_evento,'%y-%m-%d') AS fecha_evento, ubicacion_evento FROM eventos_importantes")
        //console.log(result);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({error});
    }
}

const saveEventos = async (req, res)=>{
    try {
        const {FK_categoria, descripcion_evento, fecha_evento,ubicacion_evento} = req.body

        const [result] = await pool.query('INSERT INTO eventos_importantes SET ?', {FK_categoria, descripcion_evento, fecha_evento,ubicacion_evento})
        return res.status(200).json({FK_categoria, descripcion_evento, fecha_evento,ubicacion_evento, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

