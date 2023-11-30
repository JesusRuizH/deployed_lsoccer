import { pool } from '../../../../config/db'
import * as bcrypt from "bcryptjs"

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getUsuario(req, res);
        //si ees POST va a guardar el producto
        case 'POST':
            return await creandoUsuario_pass(req,res)
    }
    
}

//funciones

const creandoUsuario_pass = async (req,res) =>{
    try {
        
        var {nombre_usuario, apellidos_usuario, fecha_naci_usuario, celular_usuario, fk_contacto_emergencia, fk_tipo_cuenta, usuario , pw, correo, estado} = req.body
        
        const saltRounds = 1;
        var hashedPassword;
        bcrypt.hash(pw, saltRounds)
                .then(hash => {
                    pw = hash
                    saveUsuario(nombre_usuario, apellidos_usuario, fecha_naci_usuario, celular_usuario, fk_contacto_emergencia, fk_tipo_cuenta, usuario , pw, correo, estado, req,res)
                    //console.log('Hash ', pw)
                })
                .catch(err => console.error(err.message))
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getUsuario = async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT pk_usuario, nombre_usuario, apellidos_usuario, TO_CHAR(fecha_naci_usuario, 'YYYY-MM-DD') AS fecha_naci_usuario, celular_usuario, FK_contacto_emergencia, FK_tipo_cuenta, usuario, LEFT(pw , 10) AS pw, correo, estado FROM usuario");
        const usu = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(usu);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
};

const saveUsuario = async (nombre_usuario, apellidos_usuario, fecha_naci_usuario, celular_usuario, fk_contacto_emergencia, fk_tipo_cuenta, usuario , pw, correo, estado, req, res)=>{
    const client = await pool.connect();
    try {
        const result = await client.query(
        'INSERT INTO usuario (nombre_usuario, apellidos_usuario, fecha_naci_usuario, celular_usuario, fk_contacto_emergencia, fk_tipo_cuenta, usuario , pw, correo, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
        [nombre_usuario, apellidos_usuario, fecha_naci_usuario, celular_usuario, fk_contacto_emergencia, fk_tipo_cuenta, usuario , pw, correo, estado]
        );
        return res.status(200).json({nombre_usuario, apellidos_usuario, fecha_naci_usuario, celular_usuario, fk_contacto_emergencia, fk_tipo_cuenta, usuario , pw, correo, estado, id: result.insertId})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
       
}
