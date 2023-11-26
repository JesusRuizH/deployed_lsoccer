import {Navegador} from "../../components/navegador";
import withSession from "../../lib/session";
import axios from "axios";

export default function Profile({user, contacto}) {
    return (
      <>
        <div className=" m-auto w-full">
          <Navegador user={user}/>

          <div className="p-0 space-y-10">
            <ProfileInfo user={user} contact={contacto}/>
          </div>
        </div>
      </>
    );
}

function ProfileInfo({user, contact}) {
      const estado = () => {
        if(user.estado === 0) return <h1>No activo</h1>
        return <h1>Activo</h1>
      }

      const cate_alumno = () => {
        if(user.FK_tipo_cuenta === 1){
            return (
            <>
                <p className="font-bold text-gray-700 text-xl">{user.FK_categoria}</p>
                <p className="text-gray-400">Categoria</p>
            </>)
        } 
      }

      const tipo_perfil = () => {
        if(user.FK_tipo_cuenta === 1){
            return (
            <>
                <p className="mt-8 text-gray-500">Cuenta de Alumno</p>
            </>)
        }else if(user.FK_tipo_cuenta === 2){
          return (
            <>
                <p className="mt-8 text-gray-500">Cuenta de Director Deportivo</p>
            </>)
        }else if(user.FK_tipo_cuenta === 3){
          return (
            <>
                <p className="mt-8 text-gray-500">Cuenta de Administrador</p>
            </>)
        }else if(user.FK_tipo_cuenta === 4){
          return (
            <>
                <p className="mt-8 text-gray-500">Cuenta de Entrenador</p>
            </>)
        }
      }
      

    return (
        <div className="p-16">
        <div className="p-8 bg-white shadow mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
                <p className="font-bold text-gray-700 text-xl">#{user.PK_usuario}</p>
                <p className="text-gray-400">Numero de Registro</p>
            </div>
            <div>
                <div>{cate_alumno()}</div>
            </div>
            </div>
            <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
            </div>
            </div>

            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">

            </div>
        </div>

        <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-700">{user.nombre_usuario} {user.apellidos_usuario}<span className="font-light text-gray-500"> ({user.usuario})</span></h1>
            <div className="font-light text-gray-600 mt-3">{estado()}</div>

            <div>{tipo_perfil()}</div>
        </div>

        <div className="mt-12 flex flex-col justify-center">
            <ContactInfo usuario={user} contacto={contact}/>
        </div>

        </div>
        </div>
    );
  }

  function ContactInfo({usuario, contacto}) {
    let contacto_eme = {};
    function getEvents(){
    let i = 0;
    while(i < contacto.length){
      if(contacto[i].PK_contacto_emergencia === usuario.FK_contacto_emergencia){
        contacto_eme = contacto[i];
      }
      i++;
    }
  }
  getEvents();
  
    return (
        <div className=" mt-1">
              <h3 className="mt-8 text-gray-500">Informacion de contacto</h3>
              <h3 className="text-gray-600 font-light lg:px-16 mt-2">Correo: {usuario.correo}</h3>
              <h3 className="text-gray-600 font-light lg:px-16 mt-2">Celular: {usuario.celular_usuario}</h3>
              <h3 className="mt-8 text-gray-500">Contacto de emergencia</h3>
              <h3 className="text-gray-600 font-light lg:px-16 mt-2">Nombre del contacto: {contacto_eme.nombre_contacto} {contacto_eme.apellido_contacto}</h3>
              <h3 className="text-gray-600 font-light lg:px-16 mt-2">Telefono: {contacto_eme.telefono_contacto}</h3>
              <h3 className="text-gray-600 font-light lg:px-16 mt-2">Celular: {contacto_eme.cel_contacto}</h3>
        </div>
    );
  }

  export const getServerSideProps = withSession(async function ({ req, res }) {
    const user = req.session.get("user");
    if (user === undefined) {
      res.setHeader("location", "/login");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }

    const {data: contacto} = await axios.get(
        "http://localhost:3000/api/contacto"
    );
  
    //console.log(eventos)
  
    return {
      props: { 
               user: req.session.get("user"),
               contacto,       
        },
               
    };
  });