import { pool } from "../../../../config/db"
import * as bcrypt from "bcryptjs"

export default async function handler(req, res){
    
    switch (req.method) {
        case 'GET':
            return await getUsuario(req, res)
        case 'DELETE':
            return await deleteUsuario(req, res)
        case 'PUT':
            return await updateUser_pass(req, res)
        default:
            break;
    }
    
}

const getUsuario = async (req, res) => {
    
    try {
        const {id} = req.query
        const client = await pool.connect();
        const result = await client.query("SELECT pk_usuario, nombre_usuario, apellidos_usuario, TO_CHAR(fecha_naci_usuario, 'YY-MM-DD') AS fecha_naci_usuario, celular_usuario, FK_contacto_emergencia, FK_tipo_cuenta, usuario, LEFT(pw , 10) AS pw, correo, estado FROM usuario WHERE pk_usuario = $1", [id])
        const usu = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(usu[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
}

const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.query;
        const client = await pool.connect();
        await client.query('DELETE FROM usuario WHERE pk_usuario = $1', [id]);
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateUser_pass = async (req,res) =>{
    try {
        
        var {nombre_usuario, apellidos_usuario, fecha_naci_usuario, celular_usuario, fk_contacto_emergencia, fk_tipo_cuenta, usuario , pw, correo, estado} = req.body
        
        const saltRounds = 1;
        var hashedPassword;
        bcrypt.hash(pw, saltRounds)
                .then(hash => {
                    pw = hash
                    return updateUsuario(nombre_usuario, apellidos_usuario, fecha_naci_usuario, celular_usuario, fk_contacto_emergencia, fk_tipo_cuenta, usuario , pw, correo, estado, req,res)
                    //console.log('Hash ', pw)
                })
                .catch(err => console.error(err.message))
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const updateUsuario = async (nombre_usuario, apellidos_usuario, fecha_naci_usuario, celular_usuario, fk_contacto_emergencia, fk_tipo_cuenta, usuario , pw, correo, estado, req, res) => {
    const { id } = req.query;
    try{
        const client = await pool.connect();
        await client.query('UPDATE usuario SET nombre_usuario = $1 , apellidos_usuario = $2 , fecha_naci_usuario = $3, celular_usuario = $4 ,  fk_contacto_emergencia = $5 , fk_tipo_cuenta = $6 , usuario = $7 , pw = $8 , correo = $9, estado = $10 WHERE pk_usuario = $11', [nombre_usuario, apellidos_usuario, fecha_naci_usuario, celular_usuario, fk_contacto_emergencia, fk_tipo_cuenta, usuario , pw, correo, estado, id]);
        return res.status(204).json();
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
}