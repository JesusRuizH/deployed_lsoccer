import axios from "axios";
import { Layout } from "../../components/Layout";
import Link from 'next/link'
import { useRouter } from "next/router";
import { AlumnoCard } from "../../components/alumnoCard";

function FirstPage({alumno}) {

  const router = useRouter()

  const renderAlumno = () => {

    if(alumno.length === 0) return <h1 className="teext-center text-2xl font-bold">No hay alumnos aún</h1>
    return alumno.map((alu) => (
      <AlumnoCard alu={alu} key={alu.fk_usuario} />
    ));
  }

  return (
    //toma productForm dede components para darle formato a la pagina inicial
    <Layout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {renderAlumno()}

        <button className="bg-orange-500 hover:bg-amber-400 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white"
        onClick={() => router.push("/newAlumno")}
        >Nuevo alumno</button>
      </div>

    </Layout>
  );
}

//funcion especial de next para ejecutar una logica antes ded que la pantalla sea devuelta al cliente
export  const getServerSideProps = async (context)  =>{
  const {data: alumno} = await axios.get(
    "https://deployed-lsoccer.vercel.app/api/alumno"
    );
  
  return {
    props: {
        alumno,
    }, // will be passed to the page component as props
  };
};


export default FirstPage;