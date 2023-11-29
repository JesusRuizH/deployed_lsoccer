import {Navegador} from "../../components/navegador";
import withSession from "../../lib/session";
import axios from "axios";

export default function Home({user, dires_dep}) {
    return (
        <>
        <Navegador user={user}/>
        
        <p className="ml-8 mt-8 mb-2 text-gray-500">Cuentas de Directores Deportivos Existentes</p>
        <div>
            <dl className="grid max-w-xl grid-cols-2 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16 pt-3">
                {
                dires_dep.map((feature) => (
                    
                    <div key={feature.pk_usuario} 
                    className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] white:bg-neutral-700 lg">       
                        <div className="flex flex-col justify-start p-6"> 
                            <div
                            className="mb-8 text-xl font-medium text-neutral-800 dark:text-black">
                                Nº Reg: {feature.pk_usuario} <br />
                            </div>
                            <div
                            className="mb-8 text-xl font-medium text-neutral-800 dark:text-black">
                                Nombre Completo del Alumno:<br /> {feature.nombre_usuario} {feature.apellidos_usuario}
                            </div>
                            <div className="mb-5 text-base text-neutral-600 dark:text-black">
                                <p>Fecha de nacimiento: {feature.fecha_naci_usuario} </p> 
                                <p>Correo : {feature.correo} </p>  
                                <p>Estado : {feature.estado} </p>  
                            </div>

                            </div>
                    </div>            
                ))
                }
            </dl>
        </div>

        <p className="ml-8 mt-8 mb-2 text-gray-500">Crear Director Deportivo</p>
        <iframe className="w-full aspect-[5/2]" src="https://deployed-lsoccer.vercel.app/director"></iframe>
        </>
    )
    
}

export const getServerSideProps = withSession(async function ({ req, res }) {
    const user = req.session.get("user");
    if (user === undefined) {
      res.setHeader("location", "/login");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }

    const {data: dires_dep} = await axios.get(
      "https://deployed-lsoccer.vercel.app/api/soloDirectores"
    )

    return {
      props: { dires_dep,
               user: req.session.get("user"),     
        },
               
    };
  });