import axios from "axios";
import { Layout } from "../../components/Layout";
import Link from 'next/link'
import { useRouter } from "next/router";
import { Tipo_cuentaCard } from "../../components/tipo_cuentaCard";

function FirstPage({tipo_cuenta}) {

  const router = useRouter()

  const renderTipo_cuenta = () => {

    if(tipo_cuenta.length === 0) return <h1 className="teext-center text-2xl font-bold">No hay nada tipo de cuenta todavia :(</h1>
    return tipo_cuenta.map((tipo_c) => (
      <Tipo_cuentaCard tipo_c={tipo_c} key={tipo_c.PK_tipo_cuenta} />
    ));
  }

  return (
    //toma productForm dede components para darle formato a la pagina inicial
    <Layout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {renderTipo_cuenta()}

        <button className="bg-orange-500 hover:bg-amber-400 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white"
        onClick={() => router.push("/newTipo_cuenta")}
        >Nuevo tipo de cuenta</button>
      </div>

    </Layout>
  );
}

//funcion especial de next para ejecutar una logica antes ded que la pantalla sea devuelta al cliente
export  const getServerSideProps = async (context)  =>{
  const {data: tipo_cuenta} = await axios.get(
    "http://localhost:3000/api/tipo_cuenta"
    );
  
  return {
    props: {
        tipo_cuenta,
    }, // will be passed to the page component as props
  };
};


export default FirstPage;