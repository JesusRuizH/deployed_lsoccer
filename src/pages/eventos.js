import axios from "axios";
import { Layout } from "../../components/Layout";
import Link from 'next/link'
import { useRouter } from "next/router";
import { EventosCard } from "../../components/eventosCard";

function FirstPage({eventos}) {

  const router = useRouter()

  const renderEventos = () => {

    if(eventos.length === 0) return <h1 className="teext-center text-2xl font-bold">No hay eventos</h1>
    return eventos.map((eve) => (
      <EventosCard eve={eve} key={eve.PK_eventos} />
    ));
  }

  return (
    //toma productForm dede components para darle formato a la pagina inicial
    <Layout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {renderEventos()}

        <button className="bg-orange-500 hover:bg-amber-400 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white"
        onClick={() => router.push("/newEventos")}
        >Nuevo evento</button>
      </div>

    </Layout>
  );
}

//funcion especial de next para ejecutar una logica antes ded que la pantalla sea devuelta al cliente
export  const getServerSideProps = async (context)  =>{
  const {data: eventos} = await axios.get(
    "http://localhost:3000/api/eventos"
    );
  
  return {
    props: {
        eventos,
    }, // will be passed to the page component as props
  };
};


export default FirstPage;