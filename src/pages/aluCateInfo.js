import {Navegador} from "../../components/navegador";
import withSession from "../../lib/session";
import axios from "axios";

export default function Home({user, cate}) {
    const miCategoria = () =>{
        let i = 0;
        while(i < cate.length)
        {
            if(user.fk_categoria === cate[i].pk_categoria){
                return(
                    <div>
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-1 lg:gap-y-16 pt-3">
                            <div key={cate[i].pk_categoria} 
                            className="text-center flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] white:bg-neutral-700 lg">       
                                <div className="flex flex-col justify-start p-20"> 
                                    <div
                                    className="mb-8 text-xl font-medium text-neutral-800 dark:text-black">
                                        Categoria: {cate[i].pk_categoria} <br />
                                    </div>
                                    <div className="mb-5 text-base text-neutral-600 dark:text-black">
                                        <p>Fecha de inicio de categoria: {cate[i].fecha_categoria_ini} </p> 
                                        <p>Fecha de termino de categoria: {cate[i].fecha_categoria_fin} </p>  
                                        
                                        <br />
                                        <p>Dias de entrenamiento: {cate[i].dias_entrenamiento} </p>  
                                        <p>Hora de inicio del entrenamiento: {cate[i].horarios_entrena_ini} </p>  
                                        <p>Hora de termino del entrenamiento: {cate[i].horarios_entrena_fin} </p>  
                                        <p>Turno (Matutino/Vespertino): {cate[i].turno} </p>  
                                    </div>

                                    </div>
                            </div>            
                        </dl>
                    </div>
                )
            }
            i++;
        }
    }

    return (
        <>
        <Navegador user={user}/>
        <div>
            {miCategoria()}
        </div>
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
    const {data: cate} = await axios.get(
        "https://deployed-lsoccer.vercel.app/api/catesHorarios"
        );

    return {
      props: { cate,
               user: req.session.get("user"),     
        },
               
    };
  });