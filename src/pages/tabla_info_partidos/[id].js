import { Layout } from '../../../components/Layout'
import axios from 'axios'
import {useRouter} from 'next/router'
import { toast } from 'react-toastify'

function Tabla_info_partidosPage({ tabla }) { 
  
    const router = useRouter()

    const handleDelete = async (id) => {
      try {
        await axios.delete('/api/tabla_info_partidos/' + id)
        router.push('/tabla_info_partidos')
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  //when I press the button comes here
  return (
    <Layout>
      <h1>{tabla.PK_tabla_info_partidos}</h1> 
      <h1>{tabla.FK_categoria}</h1> 
      <h1>{tabla.fecha_partido}</h1> 
      <h1>{tabla.nombre_encargado}</h1> 

      <button 
        className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded" 
        onClick={() => handleDelete(tabla.PK_tabla_info_partidos)}
      >

        Eliminar
      </button>

      <button
        className="bg-gray-500 hover:bg-gray-800 ml-2 text-white px-5 py-2 rounded" 
        onClick={() => router.push("/tabla_info_partidos/edit/"+ tabla.PK_tabla_info_partidos)}
      >
        Editar
      </button>

    </Layout>
  );
}

export const getServerSideProps = async (context) => {

    const {data: tabla} = await axios.get('https://deployed-lsoccer.vercel.app/api/tabla_info_partidos/' + context.query.id)
    return {
        props: {
            tabla,
        },
    };
};

export default Tabla_info_partidosPage; 