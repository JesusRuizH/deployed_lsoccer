import { pool } from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getLiga(req, res);
        //si ees POST va a guardar el producto
        case 'POST':
            return await saveLiga(req,res)
    }
    
}

//funciones

const getLiga = async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT pk_liga, nombre_liga, TO_CHAR(fecha_categoria_ini, 'YYYY-MM-DD') AS fecha_categoria_ini, TO_CHAR(fecha_categoria_fin, 'YYYY-MM-DD') AS fecha_categoria_fin FROM liga;");
        const lig = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(lig);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
};

const saveLiga = async (req, res)=>{
    const client = await pool.connect();
    const {nombre_liga, fecha_categoria_ini, fecha_categoria_fin} = req.body
    try {
        const result = await client.query(
        'INSERT INTO liga (nombre_liga ,fecha_categoria_ini, fecha_categoria_fin) VALUES ($1, $2, $3)',
        [nombre_liga, fecha_categoria_ini, fecha_categoria_fin]
        );
        return res.status(200).json({nombre_liga, fecha_categoria_ini, fecha_categoria_fin, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
       
}
