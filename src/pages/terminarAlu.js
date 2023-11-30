import {Navegador} from "../../components/navegador";
import withSession from "../../lib/session";
import axios from "axios";

export default function Home({user, alumno, cate}) {
    return (
        <>
        <Navegador user={user}/>
        <p className="ml-8 mt-8 mb-2 text-gray-500">Cuentas de Alumnos Existentes</p>
        <div>
            <dl className="grid max-w-xl grid-cols-2 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16 pt-3">
                {
                alumno.map((feature) => (
                    
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
        <p className="ml-8 mt-8 mb-2 text-gray-500">Categorias Existentes</p>
        <div>
            <dl className="grid max-w-xl grid-cols-2 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16 pt-3">
                {
                cate.map((feature) => (
                    
                    <div key={feature.pk_categoria} 
                    className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] white:bg-neutral-700 lg">       
                        <div className="flex flex-col justify-start p-6"> 
                            <div
                            className="mb-8 text-xl font-medium text-neutral-800 dark:text-black">
                                Nº categoria: {feature.pk_categoria} <br />
                            </div>
                            <div
                            className="mb-8 text-xl font-medium text-neutral-800 dark:text-black">
                                Turno:<br /> {feature.turno}
                            </div>
                            <div className="mb-5 text-base text-neutral-600 dark:text-black">
                                <p>Fecha de inicio de categoria: {feature.fecha_categoria_ini} </p> 
                                <p>Fecha de termino de categoria : {feature.fecha_categoria_fin} </p>  
                            </div>

                            </div>
                    </div>            
                ))
                }
            </dl>
        </div>
        <p className="ml-8 mt-8 mb-2 text-gray-500">Finalizar cuenta de Alumno</p>
        <iframe className="w-full aspect-[4/3]" src="https://deployed-lsoccer.vercel.app/alumno"></iframe>
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
        "https://deployed-lsoccer.vercel.app/api/soloAlumnos"
        );

    const {data: cate} = await axios.get(
        "https://deployed-lsoccer.vercel.app/api/categoria"
        );
    
    return {
        props: { cate,
               alumno,
               user: req.session.get("user"),     
        },
               
    };
  });