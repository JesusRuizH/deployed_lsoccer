import { pool } from '../../../../config/db'

export default async function handler(req, res){

    switch(req.method){
        //si la llamada a la pagina es GET va a listar todos los productos
        case 'GET': 
            return await getAlumno(req, res);
        //si ees POST va a guardar el producto
        case 'POST':
            return await saveAlumno(req,res)
    }
    
}

//funciones

const getAlumno = async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM alumno');
        const alumnos = result.rows;  // Accede a la propiedad 'rows' para obtener los resultados
        return res.status(200).json(alumnos);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
};

const saveAlumno = async (req, res)=>{
  try {
      const client = await pool.connect();
      const {fk_usuario, fk_categoria, posicion_jugador, pago_mensual, pago_liga, jersey, key_cuenta_pago} = req.body
    
        const result = await client.query(
          'INSERT INTO alumno (fk_usuario, fk_categoria, posicion_jugador, pago_mensual, pago_liga, jersey, key_cuenta_pago) VALUES ($1, $2, $3, $4, $5, $6, $7)',
          [fk_usuario, fk_categoria, posicion_jugador, pago_mensual, pago_liga, jersey, key_cuenta_pago]
        );
        return res.status(200).json({fk_usuario, fk_categoria, posicion_jugador, pago_mensual, pago_liga, jersey, key_cuenta_pago, id: result.insertId})
    } catch (error) {
      return res.status(500).json({message: error.message})
  }
}


