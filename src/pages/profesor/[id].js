import { Layout } from '../../../components/Layout'
import axios from 'axios'
import {useRouter} from 'next/router'
import { toast } from 'react-toastify'

function ProfesorPage({ prof }) { 
  
    const router = useRouter()

    const handleDelete = async (id) => {
      try {
        await axios.delete('/api/profesor/' + id)
        router.push('/profesor')
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  //when I press the button comes here
  return (
    <Layout>
      <h1>{prof.fk_usuario}</h1> 
      <h1>{prof.FK_cate_asignadas}</h1>
      
      <button 
        className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded" 
        onClick={() => handleDelete(prof.fk_usuario)}
      >

        Eliminar
      </button>

      <button
        className="bg-gray-500 hover:bg-gray-800 ml-2 text-white px-5 py-2 rounded" 
        onClick={() => router.push("/profesor/edit/"+prof.fk_usuario)}
      >
        Editar
      </button>

    </Layout>
  );
}

export const getServerSideProps = async (context) => {

    const {data: prof} = await axios.get('https://deployed-lsoccer.vercel.app/api/profesor/' + context.query.id)
    return {
        props: {
            prof,
        },
    };
};

export default ProfesorPage; 