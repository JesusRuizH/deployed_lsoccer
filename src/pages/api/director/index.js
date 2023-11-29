import { pool } from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getDirector(req, res);
        //si ees POST va a guardar el producto
        case 'POST':
            return await saveDirector(req,res)
    }
    
}

//funciones
const getDirector = async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM director_deportivo');
        const dire = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(dire);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
};

const saveDirector = async (req, res)=>{

    const client = await pool.connect();
    const {fk_usuario, nss,} = req.body
    try {
        const result = await client.query(
        'INSERT INTO director_deportivo (fk_usuario, nss) VALUES ($1, $2)',
        [fk_usuario, nss]
        );
        return res.status(200).json({fk_usuario, nss, id: result.insertId})
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 

}
