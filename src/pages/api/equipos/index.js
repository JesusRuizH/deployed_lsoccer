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
        const [result] = await pool.query('SELECT * FROM equipos')
        //console.log(result);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({error});
    }
}

const saveEquipos = async (req, res)=>{
    try {
        const {nombre_equipo ,posicion_tabla, FK_liga} = req.body

        const [result] = await pool.query('INSERT INTO equipos SET ?', {nombre_equipo ,posicion_tabla, FK_liga})
        return res.status(200).json({nombre_equipo ,posicion_tabla, FK_liga, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

