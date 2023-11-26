import axios from "axios";
import { Layout } from "../../components/Layout";
import Link from 'next/link'
import { useRouter } from "next/router";
import { LigaCard } from "../../components/ligaCard";

function FirstPage({liga}) {

  const router = useRouter()

  const renderLiga = () => {

    if(liga.length === 0) return <h1 className="teext-center text-2xl font-bold">No existen ligas por el momento</h1>
    return liga.map((lig) => (
      <LigaCard lig={lig} key={lig.PK_liga} />
    ));
  }

  return (
    //toma productForm dede components para darle formato a la pagina inicial
    <Layout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {renderLiga()}

        <button className="bg-orange-500 hover:bg-amber-400 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white"
        onClick={() => router.push("/newLiga")}
        >Nueva liga</button>
      </div>

    </Layout>
  );
}

//funcion especial de next para ejecutar una logica antes ded que la pantalla sea devuelta al cliente
export  const getServerSideProps = async (context)  =>{
  const {data: liga} = await axios.get(
    "https://deployed-lsoccer.vercel.app/api/liga"
    );
  
  return {
    props: {
        liga,
    }, // will be passed to the page component as props
  };
};


export default FirstPage;