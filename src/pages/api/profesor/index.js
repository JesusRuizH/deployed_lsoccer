import { pool } from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getProfesor(req, res);
        //si ees POST va a guardar el producto
        case 'POST':
            return await saveProfesor(req,res)
    }
    
}

//funciones
const getProfesor = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM profesor')
        //console.log(result);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({error});
    }
}

const saveProfesor = async (req, res)=>{
    try {
        const {FK_usuario, FK_cate_asignadas} = req.body

        const [result] = await pool.query('INSERT INTO profesor SET ?', {FK_usuario, FK_cate_asignadas})
        return res.status(200).json({FK_cate_asignadas, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

