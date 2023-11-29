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
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM tipo_cuenta');
        const tipo_cu = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(tipo_cu);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
};

const saveTipo_cuenta = async (req, res)=>{
    const client = await pool.connect();
    const {tipo} = req.body
    try {
        const result = await client.query(
        'INSERT INTO tipo_cuenta (tipo) VALUES ($1)',
        [tipo]
        );
        return res.status(200).json({tipo, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
       
}
