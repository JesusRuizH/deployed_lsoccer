import axios from "axios";
import { Layout } from "../../components/Layout";
import Link from 'next/link'
import { useRouter } from "next/router";
import { Tabla_info_partidosCard } from "../../components/tabla_info_partidosCard";

function FirstPage({tabla_info}) {

  const router = useRouter()

  const renderTabla_info_partidos = () => {

    if(tabla_info.length === 0) return <h1 className="teext-center text-2xl font-bold">No hay ninguna tabla todavia :(</h1>
    return tabla_info.map((tabla) => (
      <Tabla_info_partidosCard tabla={tabla} key={tabla.PK_tabla_info_partidos} />
    ));
  }

  return (
    //toma productForm dede components para darle formato a la pagina inicial
    <Layout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {renderTabla_info_partidos()}

        <button className="bg-orange-500 hover:bg-amber-400 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white"
        onClick={() => router.push("/newTabla_info_partidos")}
        >Nueva tabla</button>
      </div>

    </Layout>
  );
}

//funcion especial de next para ejecutar una logica antes ded que la pantalla sea devuelta al cliente
export  const getServerSideProps = async (context)  =>{
  const {data: tabla_info} = await axios.get(
    "http://localhost:3000/api/tabla_info_partidos"
    );
  
  return {
    props: {
        tabla_info,
    }, // will be passed to the page component as props
  };
};


export default FirstPage;