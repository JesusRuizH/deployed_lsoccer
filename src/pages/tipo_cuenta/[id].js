import { Layout } from '../../../components/Layout'
import axios from 'axios'
import {useRouter} from 'next/router'
import { toast } from 'react-toastify'

function Tipo_cuentaPage({ tipo_c }) { 
  
    const router = useRouter()

    const handleDelete = async (id) => {
      try {
        await axios.delete('/api/tipo_cuenta/' + id)
        router.push('/tipo_cuenta')
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  //when I press the button comes here
  return (
    <Layout>
      <h1>{tipo_c.PK_tipo_cuenta}</h1> 
      <h1>{tipo_c.tipo}</h1> 
      
      <button 
        className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded" 
        onClick={() => handleDelete(tipo_c.PK_tipo_cuenta)}
      >

        Eliminar
      </button>

      <button
        className="bg-gray-500 hover:bg-gray-800 ml-2 text-white px-5 py-2 rounded" 
        onClick={() => router.push("/tipo_cuenta/edit/"+tipo_c.PK_tipo_cuenta)}
      >
        Editar
      </button>

    </Layout>
  );
}

export const getServerSideProps = async (context) => {

    const {data: tipo_c} = await axios.get('https://deployed-lsoccer.vercel.app/api/tipo_cuenta/' + context.query.id)
    return {
        props: {
            tipo_c,
        },
    };
};

export default Tipo_cuentaPage; 