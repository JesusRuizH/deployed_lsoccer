import {Navegador} from "../../components/navegador";
import withSession from "../../lib/session";
import axios from "axios";

export default function Home({user, alumno}) {
    return (
        <>
        <Navegador user={user}/>
        <div>
            <dl className="grid max-w-xl grid-cols-2 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16 pt-3">
                {
                alumno.map((feature) => (
                    
                    <div key={feature.fk_usuario} 
                    className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] white:bg-neutral-700 lg">       
                        <div className="flex flex-col justify-start p-6"> 
                            <div
                            className="mb-8 text-xl font-medium text-neutral-800 dark:text-black">
                                Nº Reg: {feature.fk_usuario} <br />
                                Numero de cuenta alumno: {feature.key_cuenta_pago} <br />
                            </div>
                            <div
                            className="mb-8 text-xl font-medium text-neutral-800 dark:text-black">
                                Nombre Completo del Alumno: {feature.nombre_usuario} {feature.apellidos_usuario}<br />
                                Categoria: {feature.fk_categoria}
                            </div>
                            <div className="mb-5 text-base text-neutral-600 dark:text-black">
                                <p>Pago mensual: {feature.pago_mensual} </p> 
                                <p>Pago de liga : {feature.pago_liga} </p>  
                            </div>

                            </div>
                    </div>            
                ))
                }
            </dl>
        </div>
        <p className="ml-8 mt-8 mb-2 text-gray-500">Crear Nota</p>
        <iframe className="w-full aspect-[4/3]" src="https://deployed-lsoccer.vercel.app/recibo"></iframe>
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
    const {data: alumno} = await axios.get(
        "https://deployed-lsoccer.vercel.app/api/alumnos_pagos"
        );

    return {
      props: { alumno,
               user: req.session.get("user"),     
        },
               
    };
  });