import { Layout } from '../../../components/Layout'
import axios from 'axios'
import {useRouter} from 'next/router'
import { toast } from 'react-toastify'

function CategoriaPage({ cate }) { 
  
    const router = useRouter()

    const handleDelete = async (id) => {
      try {
        await axios.delete('/api/categoria/' + id)
        router.push('/categoria')
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  //when I press the button comes here
  return (
    <Layout>
      <h1>{cate.PK_categoria}</h1> 
      <h1>{cate.fecha_categoria_ini}</h1> 
      <h1>{cate.turno}</h1> 
      
      <button 
        className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded" 
        onClick={() => handleDelete(cate.PK_categoria)}
      >

        Eliminar
      </button>

      <button
        className="bg-gray-500 hover:bg-gray-800 ml-2 text-white px-5 py-2 rounded" 
        onClick={() => router.push("/categoria/edit/"+cate.PK_categoria)}
      >
        Editar
      </button>

    </Layout>
  );
}

export const getServerSideProps = async (context) => {

    const {data: cate} = await axios.get('https://deployed-lsoccer.vercel.app/api/categoria/' + context.query.id)
    return {
        props: {
            cate,
        },
    };
};

export default CategoriaPage; 