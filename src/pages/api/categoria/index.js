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
        const client = await pool.connect();
        const result = await client.query("SELECT pk_categoria, TO_CHAR(fecha_categoria_ini, 'YYYY-MM-DD') AS fecha_categoria_ini, TO_CHAR(fecha_categoria_fin, 'YYYY-MM-DD') AS fecha_categoria_fin, turno FROM categoria;");
        const cate = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(cate);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
};

const saveCategoria = async (req, res)=>{
try {
    const client = await pool.connect();
    const {fecha_categoria_ini, fecha_categoria_fin, turno,} = req.body
    const result = await client.query(
      'INSERT INTO categoria (fecha_categoria_ini, fecha_categoria_fin, turno) VALUES ($1, $2, $3)',
      [fecha_categoria_ini, fecha_categoria_fin, turno]
    );
    return res.status(200).json({fecha_categoria_ini, fecha_categoria_fin, turno, id: result.insertId}) 
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}



