import axios from "axios";
import { Layout } from "../../components/Layout";
import Link from 'next/link'
import { useRouter } from "next/router";
import { ProfesorCard } from "../../components/profesorCard";

function FirstPage({profesor}) {

  const router = useRouter()

  const renderProfesor = () => {

    if(profesor.length === 0) return <h1 className="teext-center text-2xl font-bold">No existen profesores asignados</h1>
    return profesor.map((prof) => (
      <ProfesorCard prof={prof} key={prof.FK_usuario} />
    ));
  }

  return (
    //toma productForm dede components para darle formato a la pagina inicial
    <Layout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {renderProfesor()}

        <button className="bg-orange-500 hover:bg-amber-400 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white"
        onClick={() => router.push("/newProfesor")}
        >Nuevo profesor</button>
      </div>

    </Layout>
  );
}

//funcion especial de next para ejecutar una logica antes ded que la pantalla sea devuelta al cliente
export  const getServerSideProps = async (context)  =>{
  const {data: profesor} = await axios.get(
    "http://localhost:3000/api/profesor"
    );
  
  return {
    props: {
        profesor,
    }, // will be passed to the page component as props
  };
};


export default FirstPage;