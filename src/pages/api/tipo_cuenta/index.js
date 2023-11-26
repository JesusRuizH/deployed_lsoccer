import { pool } from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getTipo_cuenta(req, res);
        //si ees POST va a guardar el producto
        case 'POST':
            return await saveTipo_cuenta(req,res)
    }
    
}

//funciones
const getTipo_cuenta = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM tipo_cuenta')
        //console.log(result);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({error});
    }
}

const saveTipo_cuenta = async (req, res)=>{
    try {
        const {tipo,} = req.body

        const [result] = await pool.query('INSERT INTO tipo_cuenta SET ?', {tipo})
        return res.status(200).json({tipo, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

