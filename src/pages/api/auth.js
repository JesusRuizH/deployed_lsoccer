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
        const PK_usuario = userCredentials.PK_usuario;
        const nombre_usuario = userCredentials.nombre_usuario;
        const apellidos_usuario = userCredentials.apellidos_usuario;
        const fecha_naci_usuario = userCredentials.fecha_naci_usuario;
        const celular_usuario = userCredentials.celular_usuario;
        const FK_contacto_emergencia = userCredentials.FK_contacto_emergencia;
        const FK_tipo_cuenta = userCredentials.FK_tipo_cuenta;
        const usuario = userCredentials.usuario;
        const correo = userCredentials.correo;
        const estado = userCredentials.estado;

        //console.log(userCredentials)
        if (await authService.validate(password, userCredentials.pw) === true){
            //console.log(password)

            if(userCredentials.FK_tipo_cuenta === 1){
                const userAlumno = await dbService.getAlumno(PK_usuario);
                const FK_categoria = userAlumno.FK_categoria;
                const KEY_cuenta_pago = userAlumno.KEY_cuenta_pago;
                //console.log(userAlumno);
                await saveSession({nombre_usuario, apellidos_usuario, PK_usuario, FK_tipo_cuenta, fecha_naci_usuario, celular_usuario, 
                                   usuario, correo, estado, FK_contacto_emergencia, FK_categoria, KEY_cuenta_pago}, req);
                res.status(200).json({nombre_usuario, apellidos_usuario, PK_usuario, FK_tipo_cuenta, fecha_naci_usuario, celular_usuario, 
                                    usuario, correo, estado, FK_contacto_emergencia, FK_categoria, KEY_cuenta_pago});
                return;
              }else if(userCredentials.FK_tipo_cuenta === 2){
                const userDirector = await dbService.getDirector(PK_usuario);
                const NSS_dire = userDirector.NSS;
                console.log(userDirector);
                await saveSession({nombre_usuario, apellidos_usuario, PK_usuario, FK_tipo_cuenta, fecha_naci_usuario, celular_usuario, 
                                  usuario, correo, estado, FK_contacto_emergencia, NSS_dire}, req);
                res.status(200).json({nombre_usuario, apellidos_usuario, PK_usuario, FK_tipo_cuenta, fecha_naci_usuario, celular_usuario, 
                                   usuario, correo, estado, FK_contacto_emergencia, NSS_dire});
                return;
              }else if(userCredentials.FK_tipo_cuenta === 3){
                const userAdministrador = await dbService.getAdministrador(PK_usuario);
                const NSS_admin = userAdministrador.NSS;
                console.log(userAdministrador);
                await saveSession({nombre_usuario, apellidos_usuario, PK_usuario, FK_tipo_cuenta, fecha_naci_usuario, celular_usuario, 
                                 usuario, correo, estado, FK_contacto_emergencia, NSS_admin}, req);
                res.status(200).json({nombre_usuario, apellidos_usuario, PK_usuario, FK_tipo_cuenta, fecha_naci_usuario, celular_usuario, 
                                     usuario, correo, estado, FK_contacto_emergencia, NSS_admin});
                return;
              }else if(userCredentials.FK_tipo_cuenta === 4){
                const userProfesor = await dbService.getProfesor(PK_usuario);
                const FK_cate_asignadas = userProfesor.FK_cate_asignadas;
                console.log(userProfesor);
                await saveSession({nombre_usuario, apellidos_usuario, PK_usuario, FK_tipo_cuenta, fecha_naci_usuario, celular_usuario, 
                                   usuario, correo, estado, FK_contacto_emergencia, FK_cate_asignadas}, req);
                res.status(200).json({nombre_usuario, apellidos_usuario, PK_usuario, FK_tipo_cuenta, fecha_naci_usuario, celular_usuario, 
                                    usuario, correo, estado, FK_contacto_emergencia, FK_cate_asignadas});
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
