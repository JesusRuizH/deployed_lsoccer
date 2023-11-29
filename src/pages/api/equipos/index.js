import { pool } from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getEquipos(req, res);
        //si ees POST va a guardar el producto
        case 'POST':
            return await saveEquipos(req,res)
    }
    
}

//funciones

const getEquipos = async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM equipos');
        const equi = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(equi);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
};

const saveEquipos = async (req, res)=>{
    const client = await pool.connect();
    const {nombre_equipo ,posicion_tabla, fk_liga} = req.body
    try {
        const result = await client.query(
        'INSERT INTO equipos (nombre_equipo ,posicion_tabla, fk_liga) VALUES ($1, $2, $3)',
        [nombre_equipo ,posicion_tabla, fk_liga]
        );
        return res.status(200).json({nombre_equipo ,posicion_tabla, fk_liga, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
       
}
