import axios from "axios";
import { Layout } from "../../components/Layout";
import Link from 'next/link'
import { useRouter } from "next/router";
import { UsuarioCard } from "../../components/usuarioCard";

function FirstPage({usuario}) {

  const router = useRouter()

  const renderUsuario = () => {

    if(usuario.length === 0) return <h1 className="teext-center text-2xl font-bold">No hay ningun usuario</h1>
    return usuario.map((usu) => (
      <UsuarioCard usu={usu} key={usu.PK_usuario} />
    ));
  }

  return (
    //toma productForm dede components para darle formato a la pagina inicial
    <div>
      <Layout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {renderUsuario()}

        <button className="bg-orange-500 hover:bg-amber-400 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white"
        onClick={() => router.push("/newUsuario")}
        >Nuevo usuario</button>
      </div>
      </Layout>
    </div>
  );
}

//funcion especial de next para ejecutar una logica antes ded que la pantalla sea devuelta al cliente
export  const getServerSideProps = async (context)  =>{
  const {data: usuario} = await axios.get(
    "https://deployed-lsoccer.vercel.app/api/usuario"
    );
  
  return {
    props: {
        usuario,
    }, // will be passed to the page component as props
  };
};


export default FirstPage;