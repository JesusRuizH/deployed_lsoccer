import { pool } from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getCate_asignadas(req, res);
        //si ees POST va a guardar el producto
        case 'POST':
            return await saveCate_asignadas(req,res)
    }
    
}

//funciones
const getCate_asignadas = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM cate_asignadas')
        //console.log(result);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({error});
    }
}

const saveCate_asignadas = async (req, res)=>{
    try {
        const {cate_uno, cate_dos, cate_tres,} = req.body

        const [result] = await pool.query('INSERT INTO cate_asignadas SET ?', {cate_uno, cate_dos, cate_tres})
        return res.status(200).json({cate_uno, cate_dos, cate_tres, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

