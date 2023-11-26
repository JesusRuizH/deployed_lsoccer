import { Layout } from '../../../components/Layout'
import axios from 'axios'
import {useRouter} from 'next/router'
import { toast } from 'react-toastify'

function Cate_asignadasPage({ c_asig }) { 
  
    const router = useRouter()

    const handleDelete = async (id) => {
      try {
        await axios.delete('/api/cate_asignadas/' + id)
        router.push('/cate_asignadas')
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  //when I press the button comes here
  return (
    <Layout>
      <h1>{c_asig.cate_uno}</h1> 
      <h1>{c_asig.cate_dos}</h1> 
      <h1>{c_asig.cate_tres}</h1> 
      
      <button 
        className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded" 
        onClick={() => handleDelete(c_asig.PK_cate_asignadas)}
      >

        Eliminar
      </button>

      <button
        className="bg-gray-500 hover:bg-gray-800 ml-2 text-white px-5 py-2 rounded" 
        onClick={() => router.push("/cate_asignadas/edit/"+c_asig.PK_cate_asignadas)}
      >
        Editar
      </button>

    </Layout>
  );
}

export const getServerSideProps = async (context) => {

    const {data: c_asig} = await axios.get('http://localhost:3000/api/cate_asignadas/' + context.query.id)
    return {
        props: {
            c_asig,
        },
    };
};

export default Cate_asignadasPage; 