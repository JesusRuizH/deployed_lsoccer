import { pool } from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getContacto(req, res);
        //si ees POST va a guardar el producto
        case 'POST':
            return await saveContacto(req,res)
    }
    
}

//funciones
const getContacto = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM contacto_emergencia')
        //console.log(result);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({error});
    }
}

const saveContacto = async (req, res)=>{
    try {
        const {nombre_contacto, apellido_contacto, telefono_contacto, cel_contacto} = req.body

        const [result] = await pool.query('INSERT INTO contacto_emergencia SET ?', {nombre_contacto, apellido_contacto, telefono_contacto, cel_contacto})
        return res.status(200).json({nombre_contacto, apellido_contacto, telefono_contacto, cel_contacto, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

