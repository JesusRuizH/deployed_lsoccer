import {Navegador} from "../../components/navegador";
import withSession from "../../lib/session";
import axios from "axios";

export default function Home({user, catesProf, categorias}) {
    let i = 0;
    let profe = [];
    while(i < catesProf.length){
        if(catesProf[i].PK_usuario == user.PK_usuario){
            profe = catesProf[i];
        }
        i++;
    }

    let j = 0;
    let cates = [];
    while(j < categorias.length){
        if(categorias[j].PK_categoria == profe.cate_uno){
            cates.push(categorias[j]);
        }
        if(categorias[j].PK_categoria == profe.cate_dos){
            cates.push(categorias[j]);
        }
        if(categorias[j].PK_categoria == profe.cate_tres){
            cates.push(categorias[j]);
        }
        j++;
    }
    
    const misCates = () =>{
        for(let x = 0; x < 3; x++){
            if(cates[x] != undefined){
                return(
                    <div>
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16 pt-3">
                            <div key={cates[x].PK_categoria} 
                            className="text-center flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] white:bg-neutral-700 lg">       
                                <div className="flex flex-col justify-start p-6"> 
                                    <div
                                    className="mb-8 text-xl font-medium text-neutral-800 dark:text-black">
                                        Categoria: {cates[x].PK_categoria} <br />
                                    </div>
                                    <div className="mb-5 text-base text-neutral-600 dark:text-black">
                                        <p>Fecha de inicio de categoria: {cates[x].fecha_categoria_ini} </p> 
                                        <p>Fecha de termino de categoria: {cates[x].fecha_categoria_fin} </p>  
                                        
                                        <br />
                                        <p>Dias de entrenamiento: {cates[x].dias_entrenamiento} </p>  
                                        <p>Hora de inicio del entrenamiento: {cates[x].horarios_entrena_ini} </p>  
                                        <p>Hora de termino del entrenamiento: {cates[x].horarios_entrena_fin} </p>  
                                        <p>Turno (Matutino/Vespertino): {cates[x].turno} </p>  
                                    </div>

                                    </div>
                            </div>            
                        </dl>
                    </div>
                )
            }      
        }
    }     
    
    return (
        <>
        <Navegador user={user}/>
        <p className="ml-8 mt-8 mb-2 text-gray-500">Mis Categorias</p>
        <div>
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-1 lg:gap-y-16 pt-3">
                    <div key={profe.PK_usuario} 
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
        <p className="ml-8 mt-8 mb-2 text-gray-500">Informacion de categorias</p>
        {misCates()}
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

    const {data: catesProf} = await axios.get(
        "http://localhost:3000/api/eventos_profes"
        );

    const {data: categorias} = await axios.get(
        "http://localhost:3000/api/catesHorarios"
        );
    return {
        props: { catesProf,
                 categorias,
                 user: req.session.get("user"),     
        },
               
    };
  });