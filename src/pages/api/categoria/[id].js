import { pool } from "../../../../config/db"

export default async function handler(req, res){
    
    switch (req.method) {
        case 'GET':
            return await getCategoria(req, res)
        case 'DELETE':
            return await deleteCategoria(req, res)
        case 'PUT':
            return await updateCategoria(req, res)
        default:
            break;
    }
    
}

const getCategoria = async (req, res) => {
    
    try {
        const {id} = req.query
        const client = await pool.connect();
        const result = await client.query("SELECT pk_categoria, TO_CHAR(fecha_categoria_ini, 'YYYY-MM-DD') AS fecha_categoria_ini, TO_CHAR(fecha_categoria_fin, 'YYYY-MM-DD') AS fecha_categoria_fin, turno FROM categoria WHERE pk_categoria = $1", [id])
        const cate = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(cate[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
}

const deleteCategoria = async (req, res) => {
    try {
        const { id } = req.query;
        const client = await pool.connect();
        await client.query('DELETE FROM categoria WHERE pk_categoria = $1', [id]);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateCategoria = async (req, res) => {
    const { id } = req.query;
    const {fecha_categoria_ini, fecha_categoria_fin, turno,} = req.body
    try{
        const client = await pool.connect();
        await client.query('UPDATE categoria SET fecha_categoria_ini = $1, fecha_categoria_fin = $2, turno = $3 WHERE pk_categoria = $4', [fecha_categoria_ini, fecha_categoria_fin, turno, id]);
        return res.status(204).json();
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
}