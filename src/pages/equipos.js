import axios from "axios";
import { Layout } from "../../components/Layout";
import Link from 'next/link'
import { useRouter } from "next/router";
import { EquiposCard } from "../../components/equiposCard";

function FirstPage({equipos}) {

  const router = useRouter()

  const renderEquipos = () => {

    if(equipos.length === 0) return <h1 className="teext-center text-2xl font-bold">No hay equipos aun</h1>
    return equipos.map((equi) => (
      <EquiposCard equi={equi} key={equi.pk_equipo} />
    ));
  }

  return (
    //toma productForm dede components para darle formato a la pagina inicial
    <Layout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {renderEquipos()}

        <button className="bg-orange-500 hover:bg-amber-400 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white"
        onClick={() => router.push("/newEquipos")}
        >Nuevo Equipo</button>
      </div>

    </Layout>
  );
}

//funcion especial de next para ejecutar una logica antes ded que la pantalla sea devuelta al cliente
export  const getServerSideProps = async (context)  =>{
  const {data: equipos} = await axios.get(
    "https://deployed-lsoccer.vercel.app/api/equipos"
    );
  
  return {
    props: {
        equipos,
    }, // will be passed to the page component as props
  };
};


export default FirstPage;