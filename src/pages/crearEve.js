import {Navegador} from "../../components/navegador";
import withSession from "../../lib/session";
import axios from "axios";

export default function Home({user, cates}) {
    let i = 0;
    let profe = [];
    while(i < cates.length){
        if(cates[i].pk_usuario == user.pk_usuario){
            profe = cates[i];
        }
        i++;
    }

    return (
        <>
        <Navegador user={user}/>
        <p className="ml-8 mt-8 mb-2 text-gray-500">Mis Categorias</p>
        <div>
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-1 lg:gap-y-16 pt-3">
                    <div key={profe.pk_usuario} 
                    className="text-center flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] white:bg-neutral-700 lg">       
                        <div className="flex flex-col justify-start p-6"> 
                            <div
                            className="mb-8 text-xl font-medium text-neutral-800 dark:text-black">
                                Profesor: {profe.nombre_usuario} {profe.apellidos_usuario}<br />
                            </div>
                            <div className="mb-5 text-base text-neutral-600 dark:text-black">
                                <p>Categoria 1º: {profe.cate_uno} </p> 
                                <p>Categoria 2º: {profe.cate_dos} </p>  
                                <p>Categoria 3º: {profe.cate_tres} </p>  
                            </div>

                            </div>
                    </div>            
            </dl>
        </div>
        <p className="ml-8 mt-8 mb-2 text-gray-500">Crear Eventos</p>
        <iframe className="w-full aspect-[4/3]" src="https://deployed-lsoccer.vercel.app/eventos"></iframe>
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

    const {data: cates} = await axios.get(
        "https://deployed-lsoccer.vercel.app/api/eventos_profes"
        );
    
    return {
        props: { cates,
               user: req.session.get("user"),     
        },
               
    };
  });