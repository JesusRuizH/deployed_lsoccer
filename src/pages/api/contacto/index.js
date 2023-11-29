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
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM contacto_emergencia');
        const contactos = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(contactos);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
};


const saveContacto = async (req, res)=>{
    const client = await pool.connect();
    const {nombre_contacto, apellido_contacto, telefono_contacto, cel_contacto} = req.body
    try {
      const result = await client.query(
        'INSERT INTO contacto_emergencia (nombre_contacto, apellido_contacto, telefono_contacto, cel_contacto) VALUES ($1, $2, $3, $4)',
        [nombre_contacto, apellido_contacto, telefono_contacto, cel_contacto]
      );   
      return res.status(200).json({nombre_contacto, apellido_contacto, telefono_contacto, cel_contacto, id: result.insertId})
    } catch (error) {
      return res.status(500).json({message: error.message})
  }
}

