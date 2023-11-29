import axios from "axios";
import { Layout } from "../../components/Layout";
import Link from 'next/link'
import { useRouter } from "next/router";
import { CategoriaCard } from "../../components/categoriaCard";

function FirstPage({categoria}) {

  const router = useRouter()

  const renderCategoria = () => {

    if(categoria.length === 0) return <h1 className="teext-center text-2xl font-bold">No hay categorias aún</h1>
    return categoria.map((cate) => (
      <CategoriaCard cate={cate} key={cate.pk_categoria} />
    ));
  }

  return (
    //toma productForm dede components para darle formato a la pagina inicial
    <Layout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {renderCategoria()}

        <button className="bg-orange-500 hover:bg-amber-400 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white"
        onClick={() => router.push("/newCategoria")}
        >Nueva categoria</button>
      </div>

    </Layout>
  );
}

//funcion especial de next para ejecutar una logica antes ded que la pantalla sea devuelta al cliente
export  const getServerSideProps = async (context)  =>{
  const {data: categoria} = await axios.get(
    "https://deployed-lsoccer.vercel.app/api/categoria"
    );
  
  return {
    props: {
        categoria,
    }, // will be passed to the page component as props
  };
};


export default FirstPage;