import { Layout } from '../../../components/Layout'
import axios from 'axios'
import {useRouter} from 'next/router'
import { toast } from 'react-toastify'

function EventosPage({ eve }) { 
  
    const router = useRouter()

    const handleDelete = async (id) => {
      try {
        await axios.delete('/api/eventos/' + id)
        router.push('/eventos')
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  //when I press the button comes here
  return (
    <Layout>
      <h1>{eve.FK_categoria}</h1> 
      <h1>{eve.descripcion_evento}</h1> 
      <h1>{eve.fecha_evento}</h1> 
      
      <button 
        className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded" 
        onClick={() => handleDelete(eve.PK_eventos)}
      >

        Eliminar
      </button>

      <button
        className="bg-gray-500 hover:bg-gray-800 ml-2 text-white px-5 py-2 rounded" 
        onClick={() => router.push("/eventos/edit/"+eve.PK_eventos)}
      >
        Editar
      </button>

    </Layout>
  );
}

export const getServerSideProps = async (context) => {

    const {data: eve} = await axios.get('http://localhost:3000/api/eventos/' + context.query.id)
    return {
        props: {
            eve,
        },
    };
};

export default EventosPage; 