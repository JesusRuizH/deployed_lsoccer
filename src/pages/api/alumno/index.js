import { pool } from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getAlumno(req, res);
        //si ees POST va a guardar el producto
        case 'POST':
            return await saveAlumno(req,res)
    }
    
}

//funciones
const getAlumno = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM alumno')
        //console.log(result);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({error});
    }
}

const saveAlumno = async (req, res)=>{
    try {
        const {FK_usuario, FK_categoria, posicion_jugador, pago_mensual, pago_liga, jersey, KEY_cuenta_pago} = req.body

        const [result] = await pool.query('INSERT INTO alumno SET ?', {FK_usuario, FK_categoria, posicion_jugador, pago_mensual, pago_liga, jersey, KEY_cuenta_pago})
        return res.status(200).json({FK_usuario, FK_categoria, posicion_jugador, pago_mensual, pago_liga, jersey, KEY_cuenta_pago, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

