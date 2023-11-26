import axios from "axios";
import { Layout } from "../../components/Layout";
import Link from 'next/link'
import { useRouter } from "next/router";
import { EntrenamientosCard } from "../../components/entrenamientosCard";

function FirstPage({entrenamientos}) {

  const router = useRouter()

  const renderEntrenamientos = () => {

    if(entrenamientos.length === 0) return <h1 className="teext-center text-2xl font-bold">No hay entrenamientos creados</h1>
    return entrenamientos.map((entr) => (
      <EntrenamientosCard entr={entr} key={entr.PK_entrenamientos} />
    ));
  }

  return (
    //toma productForm dede components para darle formato a la pagina inicial
    <Layout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {renderEntrenamientos()}

        <button className="bg-orange-500 hover:bg-amber-400 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white"
        onClick={() => router.push("/newEntrenamientos")}
        >Nuevo entrenamiento</button>
      </div>

    </Layout>
  );
}

//funcion especial de next para ejecutar una logica antes ded que la pantalla sea devuelta al cliente
export  const getServerSideProps = async (context)  =>{
  const {data: entrenamientos} = await axios.get(
    "https://deployed-lsoccer.vercel.app/api/entrenamientos"
    );
  
  return {
    props: {
        entrenamientos,
    }, // will be passed to the page component as props
  };
};


export default FirstPage;