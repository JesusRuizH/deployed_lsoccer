import {Navegador} from "../../components/navegador";
import withSession from "../../lib/session";
import axios from "axios";

export default function Home({user, tablas}) {
    const tablas_partidos = () =>{

        const resultPartido = (resu) =>{
            if(resu === 0)return <p>Perdido</p>
            return <p>Ganado</p>
        }

        let i = 0;
        while(i < tablas.length)
        {
            if(tablas[i].FK_categoria === user.FK_categoria){
                return(
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16 pt-3">
                    <div key={tablas[i].PK_tabla_info_partidos} 
                        className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] white:bg-neutral-700 lg ">       
                        <div className="flex flex-col justify-start p-6"> 
                            <div
                            className="mb-8 text-xl font-medium text-neutral-800 dark:text-black">
                                Categoria Nº: {tablas[i].FK_categoria} <br />
                                Fecha del partido: {tablas[i].fecha_partido} <br />
                            </div>
                            <div
                            className="mb-8 text-xl font-medium text-neutral-800 dark:text-black">
                                Nombre del encargado del evento: {tablas[i].nombre_encargado}<br />
                            </div>
                            <div className="mb-5 text-base text-neutral-600 dark:text-black">
                                <p>Incidentes: {tablas[i].incidentes} </p> 
                                <p>Goles a favor: {tablas[i].goles_favor} </p> 
                                <p>Goles en contra: {tablas[i].goles_contra} </p> 
                                <p>Nº Tarjetas rojas: {tablas[i].num_tarjetas_rojas} </p> 
                                <p>Nº Tarjetas amarillas: {tablas[i].num_tarjetas_amarillas} </p> 
                                <div>Resultado del partido: {resultPartido(tablas[i].resultado)} </div> 
                                <p>Datos extra: {tablas[i].datos_extra} </p> 
                            </div>

                            </div>
                        </div>
                    </dl>
                )
            }
            i++;
        }
    }

    return (
        <>
        <Navegador user={user}/>
        <div>
            {tablas_partidos()}
        </div>
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
    const {data: tablas} = await axios.get(
        "http://localhost:3000/api/tabla_info_partidos"
        );

    return {
      props: { tablas,
               user: req.session.get("user"),     
        },
               
    };
  });