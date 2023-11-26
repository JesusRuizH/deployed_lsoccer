import Head from 'next/head'
import axios from "axios";
import withSession from "../../lib/session";

import {Navegador} from "../../components/navegador";


export default function Home({ user , eventos, cate_asignadas, eventos_profes}) {

  if(user.FK_tipo_cuenta === 1){
    return(
      <Alumno
      usuario = {user} eve = {eventos} categorias = {cate_asignadas} eventos_p = {eventos_profes} />
    )
  }else if(user.FK_tipo_cuenta === 2){
    return(
      <Director
      usuario = {user} eve = {eventos} categorias = {cate_asignadas} eventos_p = {eventos_profes} />
    )
  }else if(user.FK_tipo_cuenta === 3){
    return(
      <Administrador
      usuario = {user} eve = {eventos} categorias = {cate_asignadas} eventos_p = {eventos_profes} />
    )
  }else if(user.FK_tipo_cuenta === 4){
    return(
      <>
      <Profesor
      usuario = {user} eve = {eventos} categorias = {cate_asignadas} eventos_p = {eventos_profes} />
      </>
    )
  }
}


function MainDashboard({event, user, cates, eventos_profes}) {
  let arrEvents = [];
  
  if(user.FK_tipo_cuenta === 1){
    function getEvents(){
      let i = 0;
        while(i < event.length){
          if(event[i].FK_categoria === user.FK_categoria){
            arrEvents.push(event[i]);
          }
          i++;
        }
    }
    getEvents();
  }else if(user.FK_tipo_cuenta === 4){
      function getEvents(){
      let i = 0;
      let j = 0;
      while(j <= cates.length)
      {
        if(user.FK_cate_asignadas === j){
          while(i < event.length){
            if(event[i].FK_categoria === cates[j-1].cate_uno){
              
              arrEvents.push(event[i]);
            }
            if(event[i].FK_categoria === cates[j-1].cate_dos){
              arrEvents.push(event[i]);
            }
            if(event[i].FK_categoria === cates[j-1].cate_tres){
              arrEvents.push(event[i]);
            }
            i++;
          }
        }
        j++;
      }
    }
    getEvents();
  }else if(user.FK_tipo_cuenta === 2 || user.FK_tipo_cuenta === 3){
    arrEvents = event;
  } 

  const getProfes = (FK_categoria) =>{
    let i = 0;
    while(i < eventos_profes.length){
      if(FK_categoria === eventos_profes[i].cate_uno){
        return(
          <>
            <p>{eventos_profes[i].nombre_usuario} {eventos_profes[i].apellidos_usuario}</p>
          </>
        )
      }
      if(FK_categoria === eventos_profes[i].cate_dos){
        return(
          <>
            <p>{eventos_profes[i].nombre_usuario} {eventos_profes[i].apellidos_usuario}</p>
          </>
        )
      }
      if(FK_categoria === eventos_profes[i].cate_tres){
        return(
          <>
            <p>{eventos_profes[i].nombre_usuario} {eventos_profes[i].apellidos_usuario}</p>
          </>
        )
      }
      i++;
    }
  }

  return (
    <div className=" rounded-sm bg-white py-24 sm:py-10 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
      <div className='flex justify-center'>
        <iframe src="https://calendar.google.com/calendar/embed?src=77781e52ee7d1f2bba61154a3104011212dd427dc57d91f1db7b012acf0c9a5d%40group.calendar.google.com&ctz=America%2FMexico_City" className='h-80 w-2/4'></iframe>
      </div>
      
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl ">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-1 lg:gap-y-16 ">
            {
            arrEvents.map((feature) => (
                  
                  <div key={feature.PK_eventos} 
                  className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] white:bg-neutral-700 lg">       
                    <div className="flex flex-col justify-start p-6"> 
                      <div
                      className="mb-8 text-xl font-medium text-neutral-800 dark:text-black">
                        {getProfes(feature.FK_categoria)}
                      </div>
                      <div className="mb-5 text-base text-neutral-600 dark:text-black">
                        <p>Fecha del evento: {feature.fecha_evento} </p> 
                        <p>Ubicacion del evento : {feature.ubicacion_evento} </p>  
                      </div>
                      <p className="text-neutral-500 dark:text-black">
                      {feature.descripcion_evento}
                      </p>
                    </div>
                  </div>            
            ))
            }
          </dl>
        </div>
      </div>
    </div>
  )
}

function Alumno({usuario, eve, categorias, eventos_p}){
  return (
  
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <Navegador user={usuario}/>

      <MainDashboard event={eve} user={usuario} cates={categorias} eventos_profes = {eventos_p}/>
    </div>
  )
}

function Administrador({usuario, eve, categorias, eventos_p}){
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <Navegador user={usuario}/>

      <MainDashboard event={eve} user={usuario} cates={categorias} eventos_profes = {eventos_p}/>
    </div>
  )
}

function Profesor({usuario, eve, categorias, eventos_p}){
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <Navegador user={usuario}/>

      <MainDashboard event={eve} user={usuario} cates={categorias} eventos_profes = {eventos_p}/>
    </div>
  )
}

function Director({usuario, eve, categorias, eventos_p}){
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <Navegador user={usuario}/>

      <MainDashboard event={eve} user={usuario} cates={categorias} eventos_profes = {eventos_p}/>
    </div>
  )
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");

  const {data: eventos} = await axios.get(
    "https://deployed-lsoccer.vercel.app/api/eventos"
  );

  const {data: cate_asignadas} = await axios.get(
    "https://deployed-lsoccer.vercel.app/api/cate_asignadas"
  );

  const {data: eventos_profes} = await axios.get(
    "https://deployed-lsoccer.vercel.app/api/eventos_profes"
  );


  if (user === undefined) {
    res.setHeader("https://deployed-lsoccer.vercel.app", "/login");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  //console.log(eventos)

  return {
    props: { eventos_profes,
             cate_asignadas,
             eventos, 
             user: req.session.get("user"),       
      },
             
  };
});
