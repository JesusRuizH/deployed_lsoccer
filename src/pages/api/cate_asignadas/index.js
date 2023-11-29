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
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM cate_asignadas');
        const cates_asignadas = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(cates_asignadas);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
};

const saveCate_asignadas = async (req, res)=>{
    const client = await pool.connect();
    const {cate_uno, cate_dos, cate_tres} = req.body
    try {
      const result = await client.query(
        'INSERT INTO cate_asignadas (cate_uno, cate_dos, cate_tres) VALUES ($1, $2, $3)',
        [cate_uno, cate_dos, cate_tres]
      );
      return res.status(200).json({cate_uno, cate_dos, cate_tres, id: result.insertId})
    }catch (error) {
      return res.status(500).json({message: error.message})
    }
  }
