import {Navegador} from "../../components/navegador";
import withSession from "../../lib/session";
import axios from "axios";

export default function Home({user, contactos, tipo_cuenta}) {
    return (
        <>
        <Navegador user={user}/>
        <p className="ml-8 mt-8 mb-2 text-gray-500">Contactos Existentes</p>
        <div>
            <dl className="grid max-w-xl grid-cols-2 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16 pt-3">
                {
                contactos.map((feature) => (
                    
                    <div key={feature.PK_contacto_emergencia} 
                    className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] white:bg-neutral-700 lg">       
                        <div className="flex flex-col justify-start p-6"> 
                            <div
                            className="mb-8 text-xl font-medium text-neutral-800 dark:text-black">
                                Codigo de contacto de emergencia: {feature.PK_contacto_emergencia} <br />
                            </div>
                            <div
                            className="mb-8 text-xl font-medium text-neutral-800 dark:text-black">
                                Nombre Completo del Contacto:<br /> {feature.nombre_contacto} {feature.apellido_contacto}
                            </div>
                            <div className="mb-5 text-base text-neutral-600 dark:text-black">
                                <p>Telefono del contacto : {feature.telefono_contacto} </p> 
                                <p>Celular del contacto : {feature.cel_contacto} </p>  
                            </div>

                            </div>
                    </div>            
                ))
                }
            </dl>
        </div>
        <p className="ml-8 mt-8 mb-2 text-gray-500">Tipos de Cuentas Existentes</p>
        <div>
            <dl className="grid max-w-xl grid-cols-2 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-4 lg:gap-y-16 pt-3">
                {
                tipo_cuenta.map((feature) => (
                    
                    <div key={feature.PK_tipo_cuenta} 
                    className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] white:bg-neutral-700 lg">       
                        <div className="flex flex-col justify-start p-6"> 
                            <div
                            className="mb-8 text-xl font-medium text-neutral-800 dark:text-black">
                                Tipo de cuenta:<br />
                                #{feature.PK_tipo_cuenta}. {feature.tipo} <br />
                            </div>

                            </div>
                    </div>            
                ))
                }
            </dl>
        </div>
        <p className="ml-8 mt-8 mb-2 text-gray-500">Crear Usuario</p>
        <iframe className="w-full aspect-[4/3]" src="https://deployed-lsoccer.vercel.app/usuario"></iframe>
        </>
    )
    
}

export const getServerSideProps = withSession(async function ({ req, res }) {
    const user = req.session.get("user");
    if (user === undefined) {
      res.setHeader("location", "https://deployed-lsoccer.vercel.app/login");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }

    const {data: contactos} = await axios.get(
      "https://deployed-lsoccer.vercel.app/api/contacto"
    );
    const {data: tipo_cuenta} = await axios.get(
      "https://deployed-lsoccer.vercel.app/api/tipo_cuenta"
    )
    return {
      props: { tipo_cuenta,
               contactos,
               user: req.session.get("user"),     
        },
               
    };
  });