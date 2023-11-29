import { pool } from "../../../../config/db"

export default async function handler(req, res){
    
    switch (req.method) {
        case 'GET':
            return await getCate_asignadas(req, res)
        case 'DELETE':
            return await deleteCate_asignadas(req, res)
        case 'PUT':
            return await updateCate_asignadas(req, res)
        default:
            break;
    }
    
}

const getCate_asignadas = async (req, res) => {
    
    try {
        const {id} = req.query
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM cate_asignadas WHERE pk_cate_asignadas = $1", [id])
        const cates_asig = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(cates_asig[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
}

const deleteCate_asignadas = async (req, res) => {
    try {
        const { id } = req.query;
        const client = await pool.connect();
        await client.query('DELETE FROM cate_asignadas WHERE pk_cate_asignadas = $1', [id]);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateCate_asignadas = async (req, res) => {
    const { id } = req.query;
    const {cate_uno, cate_dos, cate_tres,} = req.body
    try{
        const client = await pool.connect();
        await client.query('UPDATE cate_asignadas SET cate_uno = $1, cate_dos = $2, cate_tres = $3 WHERE pk_cate_asignadas = $4', [cate_uno, cate_dos, cate_tres, id]);
        return res.status(204).json();
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
}