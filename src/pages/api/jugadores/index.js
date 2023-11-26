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
        const [result] = await pool.query('SELECT * FROM jugadores_equipos')
        //console.log(result);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({error});
    }
}

const saveJugadores = async (req, res)=>{
    try {
        const {FK_equipo, nombre_jugador, posicion_jugador, jersey} = req.body

        const [result] = await pool.query('INSERT INTO jugadores_equipos SET ?', {FK_equipo, nombre_jugador, posicion_jugador, jersey})
        return res.status(200).json({FK_equipo, nombre_jugador, posicion_jugador, jersey, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

