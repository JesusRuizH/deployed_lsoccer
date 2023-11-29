import { pool } from "../../../../config/db"

export default async function handler(req, res){
    
    switch (req.method) {
        case 'GET':
            return await getAlumno(req, res)
        case 'DELETE':
            return await deleteAlumno(req, res)
        case 'PUT':
            return await updateAlumno(req, res)
        default:
            break;
    }
    
}

const getAlumno = async (req, res) => {
    
    try {
        const {id} = req.query
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM alumno WHERE fk_usuario = $1", [id])
        const alumnos = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(alumnos[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
}


const deleteAlumno = async (req, res) => {
    try {
        const { id } = req.query;
        const client = await pool.connect();
        await client.query('DELETE FROM alumno WHERE fk_usuario = $1', [id]);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateAlumno = async (req, res) => {
    const { id } = req.query;
    const {fk_usuario, fk_categoria, posicion_jugador, pago_mensual, pago_liga, jersey, key_cuenta_pago} = req.body
    try{
        const client = await pool.connect();
        await client.query('UPDATE alumno SET fk_usuario = $1, fk_categoria = $2, posicion_jugador = $3, pago_mensual = $4, pago_liga = $5, jersey = $6, key_cuenta_pago = $7 WHERE fk_usuario = $8', [fk_usuario, fk_categoria, posicion_jugador, pago_mensual, pago_liga, jersey, key_cuenta_pago, id]);
        return res.status(204).json();
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
}