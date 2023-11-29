import { pool } from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getJugadores(req, res);
        //si ees POST va a guardar el producto
        case 'POST':
            return await saveJugadores(req,res)
    }
    
}

//funciones
const getJugadores = async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM jugadores_equipos');
        const jugadores_equi = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(jugadores_equi);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
};

const saveJugadores = async (req, res)=>{
    const client = await pool.connect();
    const {fk_equipo, nombre_jugador, posicion_jugador, jersey} = req.body
    try {
        const result = await client.query(
        'INSERT INTO jugadores_equipos (fk_equipo, nombre_jugador, posicion_jugador, jersey) VALUES ($1, $2, $3, $4)',
        [fk_equipo, nombre_jugador, posicion_jugador, jersey]
        );
        return res.status(200).json({fk_equipo, nombre_jugador, posicion_jugador, jersey, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
       
}
