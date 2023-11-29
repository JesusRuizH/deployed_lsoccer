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
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM profesor');
        const profe = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(profe);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
};

const saveProfesor = async (req, res)=>{
    const client = await pool.connect();
    const {fk_usuario, fk_cate_asignadas} = req.body
    try {
        const result = await client.query(
        'INSERT INTO profesor (fk_usuario, fk_cate_asignadas) VALUES ($1, $2)',
        [fk_usuario, fk_cate_asignadas]
        );
        return res.status(200).json({fk_usuario, fk_cate_asignadas, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
       
}
