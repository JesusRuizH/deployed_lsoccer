import { pool } from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getCategoria(req, res);
        //si ees POST va a guardar el producto
        case 'POST':
            return await saveCategoria(req,res)
    }
    
}

//funciones
const getCategoria = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT PK_categoria, DATE_FORMAT(fecha_categoria_ini,'%Y-%m-%d') AS fecha_categoria_ini, DATE_FORMAT(fecha_categoria_fin,'%Y-%m-%d') AS fecha_categoria_fin, turno FROM categoria")
        //console.log(result);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({error});
    }
}

const saveCategoria = async (req, res)=>{
    try {
        const {fecha_categoria_ini, fecha_categoria_fin, turno,} = req.body

        const [result] = await pool.query('INSERT INTO categoria SET ?', {fecha_categoria_ini, fecha_categoria_fin, turno})
        return res.status(200).json({fecha_categoria_ini, fecha_categoria_fin, turno, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

