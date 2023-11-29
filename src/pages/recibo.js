import axios from "axios";
import { Layout } from "../../components/Layout";
import Link from 'next/link'
import { useRouter } from "next/router";
import { ReciboCard } from "../../components/reciboCard";

function FirstPage({recibo}) {

  const router = useRouter()

  const renderRecibo = () => {

    if(recibo.length === 0) return <h1 className="teext-center text-2xl font-bold">No hay nada en recibos todavia :(</h1>
    return recibo.map((rec) => (
      <ReciboCard rec={rec} key={rec.pk_recibo} />
    ));
  }

  return (
    //toma productForm dede components para darle formato a la pagina inicial
    <Layout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {renderRecibo()}

        <button className="bg-orange-500 hover:bg-amber-400 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white"
        onClick={() => router.push("/newRecibo")}
        >Nuevo recibo</button>
      </div>

    </Layout>
  );
}

//funcion especial de next para ejecutar una logica antes ded que la pantalla sea devuelta al cliente
export  const getServerSideProps = async (context)  =>{
  const {data: recibo} = await axios.get(
    "https://deployed-lsoccer.vercel.app/api/recibo"
    );
  
  return {
    props: {
        recibo,
    }, // will be passed to the page component as props
  };
};


export default FirstPage;