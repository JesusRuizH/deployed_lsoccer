import { Layout } from '../../../components/Layout'
import axios from 'axios'
import {useRouter} from 'next/router'
import { toast } from 'react-toastify'

function DirectorPage({ dire }) { 
  
    const router = useRouter()

    const handleDelete = async (id) => {
      try {
        await axios.delete('/api/director/' + id)
        router.push('/director')
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  //when I press the button comes here
  return (
    <Layout>
      <h1>{dire.FK_usuario}</h1> 
      <h1>{dire.NSS}</h1> 
      
      <button 
        className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded" 
        onClick={() => handleDelete(dire.FK_usuario)}
      >

        Eliminar
      </button>

      <button
        className="bg-gray-500 hover:bg-gray-800 ml-2 text-white px-5 py-2 rounded" 
        onClick={() => router.push("/director/edit/"+dire.FK_usuario)}
      >
        Editar
      </button>

    </Layout>
  );
}

export const getServerSideProps = async (context) => {

    const {data: dire} = await axios.get('https://deployed-lsoccer.vercel.app/api/director/' + context.query.id)
    return {
        props: {
            dire,
        },
    };
};

export default DirectorPage; 