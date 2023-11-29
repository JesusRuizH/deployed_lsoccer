import { Layout } from '../../../components/Layout'
import axios from 'axios'
import {useRouter} from 'next/router'
import { toast } from 'react-toastify'

function JugadoresPage({ juga }) { 
  
    const router = useRouter()

    const handleDelete = async (id) => {
      try {
        await axios.delete('/api/jugadores/' + id)
        router.push('/jugadores')
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  //when I press the button comes here
  return (
    <Layout>
      <h1>{juga.nombre_jugador}</h1> 
      <h1>{juga.posicion_jugador}</h1> 
      <h1>{juga.FK_equipo}</h1> 
      
      <button 
        className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded" 
        onClick={() => handleDelete(juga.pk_jugadores)}
      >

        Eliminar
      </button>

      <button
        className="bg-gray-500 hover:bg-gray-800 ml-2 text-white px-5 py-2 rounded" 
        onClick={() => router.push("/jugadores/edit/"+juga.pk_jugadores)}
      >
        Editar
      </button>

    </Layout>
  );
}

export const getServerSideProps = async (context) => {

    const {data: juga} = await axios.get('https://deployed-lsoccer.vercel.app/api/jugadores/' + context.query.id)
    return {
        props: {
            juga,
        },
    };
};

export default JugadoresPage; 