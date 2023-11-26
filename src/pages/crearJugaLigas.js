import {Navegador} from "../../components/navegador";
import withSession from "../../lib/session";
import axios from "axios";

export default function Home({user, equipos}) {
    return (
        <>
        <Navegador user={user}/>
        <p className="ml-8 mt-8 mb-2 text-gray-500">Equipos Existentes</p>
        <div>
            <dl className="grid max-w-xl grid-cols-2 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16 pt-3">
                {
                equipos.map((feature) => (
                    
                    <div key={feature.PK_equipo} 
                    className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] white:bg-neutral-700 lg">       
                        <div className="flex flex-col justify-start p-6"> 
                            <div
                            className="mb-8 text-xl font-medium text-neutral-800 dark:text-black">
                                Nº de Registro de Equipos: {feature.PK_equipo} <br />
                            </div>
                            <div
                            className="mb-8 text-xl font-medium text-neutral-800 dark:text-black">
                                Nombre del Equipo:<br /> {feature.nombre_equipo}
                            </div>
                            <div className="mb-5 text-base text-neutral-600 dark:text-black">
                                <p>Posicion en la tabla : # {feature.posicion_tabla} </p>  
                                <p>Liga a la que el equipo pertenece: # {feature.FK_liga} </p>  
                            </div>

                            </div>
                    </div>            
                ))
                }
            </dl>
        </div>
        <p className="ml-8 mt-8 mb-2 text-gray-500">Crear jugadores</p>
        <iframe className="w-full aspect-[5/2] " src="https://deployed-lsoccer.vercel.app/jugadores"></iframe>
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
    const {data: equipos} = await axios.get(
        "https://deployed-lsoccer.vercel.app/api/equipos"
    );
    return {
      props: { equipos,
               user: req.session.get("user"),     
        },
               
    };
  });