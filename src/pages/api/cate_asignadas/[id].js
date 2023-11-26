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
        const [result] = await pool.query("SELECT * FROM cate_asignadas WHERE PK_cate_asignadas = ?", [id])
        return res.status(200).json(result[0])
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deleteCate_asignadas = async (req, res) => {
    try {
        const {id} = req.query
        await pool.query('delete from cate_asignadas where PK_cate_asignadas = ?', [id]) 
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const updateCate_asignadas = async (req, res) => {
    const {id} = req.query
    const {cate_uno, cate_dos, cate_tres,} = req.body
    try {
        await pool.query('UPDATE cate_asignadas SET cate_uno = ? , cate_dos = ? , cate_tres = ? WHERE PK_cate_asignadas = ?' , [cate_uno, cate_dos, cate_tres, id]);
        return res.status(204).json()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}