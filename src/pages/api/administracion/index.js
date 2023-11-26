import { pool } from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getAdministracion(req, res);
        //si ees POST va a guardar el producto
        case 'POST':
            return await saveAdministracion(req,res)
    }
    
}

//funciones
const getAdministracion = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM administracion')
        //console.log(result);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({error});
    }
}

const saveAdministracion = async (req, res)=>{
    try {
        const {FK_usuario, NSS,} = req.body

        const [result] = await pool.query('INSERT INTO administracion SET ?', {FK_usuario, NSS})
        return res.status(200).json({FK_usuario, NSS, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

