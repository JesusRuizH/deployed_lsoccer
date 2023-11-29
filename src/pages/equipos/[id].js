import { Layout } from '../../../components/Layout'
import axios from 'axios'
import {useRouter} from 'next/router'
import { toast } from 'react-toastify'

function EquiposPage({ equi }) { 
  
    const router = useRouter()

    const handleDelete = async (id) => {
      try {
        await axios.delete('/api/equipos/' + id)
        router.push('/equipos')
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  //when I press the button comes here
  return (
    <Layout>
      <h1>{equi.pk_equipo}</h1> 
      <h1>{equi.nombre_equipo}</h1> 
      <h1>{equi.posicion_tabla}</h1> 
      
      <button 
        className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded" 
        onClick={() => handleDelete(equi.pk_equipo)}
      >

        Eliminar
      </button>

      <button
        className="bg-gray-500 hover:bg-gray-800 ml-2 text-white px-5 py-2 rounded" 
        onClick={() => router.push("/equipos/edit/"+equi.pk_equipo)}
      >
        Editar
      </button>

    </Layout>
  );
}

export const getServerSideProps = async (context) => {

    const {data: equi} = await axios.get('https://deployed-lsoccer.vercel.app/api/equipos/' + context.query.id)
    return {
        props: {
            equi,
        },
    };
};

export default EquiposPage; 