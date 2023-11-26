import { Layout } from '../../../components/Layout'
import axios from 'axios'
import {useRouter} from 'next/router'
import { toast } from 'react-toastify'

function AdministracionPage({ admin }) { 
  
    const router = useRouter()

    const handleDelete = async (id) => {
      try {
        await axios.delete('/api/administracion/' + id)
        router.push('/administracion')
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  //when I press the button comes here
  return (
    <Layout>
      <h1>{admin.FK_usuario}</h1> 
      <h1>{admin.NSS}</h1> 
      
      <button 
        className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded" 
        onClick={() => handleDelete(admin.FK_usuario)}
      >

        Eliminar
      </button>

      <button
        className="bg-gray-500 hover:bg-gray-800 ml-2 text-white px-5 py-2 rounded" 
        onClick={() => router.push("/administracion/edit/"+admin.FK_usuario)}
      >
        Editar
      </button>

    </Layout>
  );
}

export const getServerSideProps = async (context) => {

    const {data: admin} = await axios.get('https://deployed-lsoccer.vercel.app/api/administracion/' + context.query.id)
    return {
        props: {
            admin,
        },
    };
};

export default AdministracionPage; 