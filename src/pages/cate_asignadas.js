import axios from "axios";
import { Layout } from "../../components/Layout";
import Link from 'next/link'
import { useRouter } from "next/router";
import { Cate_asignadasCard } from "../../components/cate_asignadasCard";

function FirstPage({cate_asignadas}) {

  const router = useRouter()

  const rendeCate_asignadas = () => {

    if(cate_asignadas.length === 0) return <h1 className="teext-center text-2xl font-bold">No hay categorias asignadas</h1>
    return cate_asignadas.map((c_asig) => (
      <Cate_asignadasCard c_asig={c_asig} key={c_asig.PK_cate_asignadas} />
    ));
  }

  return (
    //toma productForm dede components para darle formato a la pagina inicial
    <Layout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {rendeCate_asignadas()}

        <button className="bg-orange-500 hover:bg-amber-400 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white"
        onClick={() => router.push("/newCate_asignadas")}
        >Nueva categoria</button>
      </div>

    </Layout>
  );
}

//funcion especial de next para ejecutar una logica antes ded que la pantalla sea devuelta al cliente
export  const getServerSideProps = async (context)  =>{
  const {data: cate_asignadas} = await axios.get(
    "https://deployed-lsoccer.vercel.app/api/cate_asignadas"
    );
  
  return {
    props: {
        cate_asignadas,
    }, // will be passed to the page component as props
  };
};


export default FirstPage;