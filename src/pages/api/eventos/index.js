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
        const client = await pool.connect();
        const result = await client.query("SELECT pk_eventos, fk_categoria, descripcion_evento, TO_CHAR(fecha_evento, 'YY-MM-DD') AS fecha_evento, ubicacion_evento FROM eventos_importantes;");
        const eve = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(eve);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
};

const saveEventos = async (req, res)=>{
    const client = await pool.connect();
    const {fk_categoria, descripcion_evento, fecha_evento,ubicacion_evento} = req.body
    try {
        const result = await client.query(
        'INSERT INTO eventos_importantes (fk_categoria, descripcion_evento, fecha_evento, ubicacion_evento) VALUES ($1, $2, $3, $4)',
        [fk_categoria, descripcion_evento, fecha_evento,ubicacion_evento]
        );
        return res.status(200).json({fk_categoria, descripcion_evento, fecha_evento, ubicacion_evento, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
       
}
