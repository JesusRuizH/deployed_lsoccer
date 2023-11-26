import axios from "axios";
import { Layout } from "../../components/Layout";
import Link from 'next/link'
import { useRouter } from "next/router";
import { JugadoresCard } from "../../components/jugadoresCard";

function FirstPage({jugadores}) {

  const router = useRouter()

  const renderJugadores = () => {

    if(jugadores.length === 0) return <h1 className="teext-center text-2xl font-bold">No hay jugadores en la lista</h1>
    return jugadores.map((juga) => (
      <JugadoresCard juga={juga} key={juga.PK_jugadores} />
    ));
  }

  return (
    //toma productForm dede components para darle formato a la pagina inicial
    <Layout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {renderJugadores()}

        <button className="bg-orange-500 hover:bg-amber-400 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white"
        onClick={() => router.push("/newJugadores")}
        >Nuevo jugador</button>
      </div>

    </Layout>
  );
}

//funcion especial de next para ejecutar una logica antes ded que la pantalla sea devuelta al cliente
export  const getServerSideProps = async (context)  =>{
  const {data: jugadores} = await axios.get(
    "http://localhost:3000/api/jugadores"
    );
  
  return {
    props: {
        jugadores,
    }, // will be passed to the page component as props
  };
};


export default FirstPage;