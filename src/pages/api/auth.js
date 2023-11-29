import { databaseServiceFactory } from "../../../services/databaseService"
import { authServiceFactory } from "../../../services/authService"
import withSession from "../../../lib/session";

import * as bcrypt from "bcryptjs"

const dbService = databaseServiceFactory();
const authService = authServiceFactory();

export default withSession(async (req, res) => {
    const ERROR_CREDENTIALS = "Invalid username and/or password";

    const method = req.method.toLowerCase();
    const { username, password } = req.body;
    
    if (method !== "post") {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const saveMono = async (req, res)=>{
        try{
            const saltRounds = 1;
            const pw = "test";
            const username = "jesus";
            let hashedPassword;
             bcrypt.hash(pw, saltRounds)
                .then(hash => {
                    hashedPassword = hash
                    console.log('Hash ', hashedPassword)
                    dbService.createUser(username, hashedPassword)
                })
                .catch(err => console.error(err.message))
        }catch(error){
            return res.status(500).json({mesage: error.mesage})
        }
    }

    //saveMono();

    try {
        const userCredentials = await dbService.getUser(username);
        const pk_usuario = userCredentials.pk_usuario;
        const nombre_usuario = userCredentials.nombre_usuario;
        const apellidos_usuario = userCredentials.apellidos_usuario;
        const fecha_naci_usuario = userCredentials.fecha_naci_usuario;
        const celular_usuario = userCredentials.celular_usuario;
        const fk_contacto_emergencia = userCredentials.fk_contacto_emergencia;
        const fk_tipo_cuenta = userCredentials.fk_tipo_cuenta;
        const usuario = userCredentials.usuario;
        const correo = userCredentials.correo;
        const estado = userCredentials.estado;

        console.log(userCredentials)
        if (await authService.validate(password, userCredentials.pw) === true){
            //console.log(password)

            if(userCredentials.fk_tipo_cuenta === 1){
                const userAlumno = await dbService.getAlumno(pk_usuario);
                const fk_categoria = userAlumno.fk_categoria;
                const key_cuenta_pago = userAlumno.key_cuenta_pago;
                //console.log(userAlumno);
                await saveSession({nombre_usuario, apellidos_usuario, pk_usuario, fk_tipo_cuenta, fecha_naci_usuario, celular_usuario, 
                                   usuario, correo, estado, fk_contacto_emergencia, fk_categoria, key_cuenta_pago}, req);
                res.status(200).json({nombre_usuario, apellidos_usuario, pk_usuario, fk_tipo_cuenta, fecha_naci_usuario, celular_usuario, 
                                    usuario, correo, estado, fk_contacto_emergencia, fk_categoria, key_cuenta_pago});
                return;
              }else if(userCredentials.fk_tipo_cuenta === 2){
                const userDirector = await dbService.getDirector(pk_usuario);
                const nss_dire = userDirector.nss;
                console.log(userDirector);
                await saveSession({nombre_usuario, apellidos_usuario, pk_usuario, fk_tipo_cuenta, fecha_naci_usuario, celular_usuario, 
                                  usuario, correo, estado, fk_contacto_emergencia, nss_dire}, req);
                res.status(200).json({nombre_usuario, apellidos_usuario, pk_usuario, fk_tipo_cuenta, fecha_naci_usuario, celular_usuario, 
                                   usuario, correo, estado, fk_contacto_emergencia, nss_dire});
                return;
              }else if(userCredentials.fk_tipo_cuenta === 3){
                const userAdministrador = await dbService.getAdministrador(pk_usuario);
                const nss_admin = userAdministrador.nss;
                console.log(userAdministrador);
                await saveSession({nombre_usuario, apellidos_usuario, pk_usuario, fk_tipo_cuenta, fecha_naci_usuario, celular_usuario, 
                                 usuario, correo, estado, fk_contacto_emergencia, nss_admin}, req);
                res.status(200).json({nombre_usuario, apellidos_usuario, pk_usuario, fk_tipo_cuenta, fecha_naci_usuario, celular_usuario, 
                                     usuario, correo, estado, fk_contacto_emergencia, nss_admin});
                return;
              }else if(userCredentials.fk_tipo_cuenta === 4){
                const userProfesor = await dbService.getProfesor(pk_usuario);
                const fk_cate_asignadas = userProfesor.fk_cate_asignadas;
                console.log(userProfesor);
                await saveSession({nombre_usuario, apellidos_usuario, pk_usuario, fk_tipo_cuenta, fecha_naci_usuario, celular_usuario, 
                                   usuario, correo, estado, fk_contacto_emergencia, fk_cate_asignadas}, req);
                res.status(200).json({nombre_usuario, apellidos_usuario, pk_usuario, fk_tipo_cuenta, fecha_naci_usuario, celular_usuario, 
                                    usuario, correo, estado, fk_contacto_emergencia, fk_cate_asignadas});
                return;
              }        
        }
    } catch (error) {
        console.log(error);
    }
    res.status(403).json({error: ERROR_CREDENTIALS});
})

async function saveSession(user, request) {
    //console.log(user)
    request.session.set("user", user);
    await request.session.save();
}
