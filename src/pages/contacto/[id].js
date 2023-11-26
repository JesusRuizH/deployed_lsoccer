import { Layout } from '../../../components/Layout'
import axios from 'axios'
import {useRouter} from 'next/router'
import { toast } from 'react-toastify'

function ContactoPage({ conta }) { 
  
    const router = useRouter()

    const handleDelete = async (id) => {
      try {
        await axios.delete('/api/contacto/' + id)
        router.push('/contacto')
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  //when I press the button comes here
  return (
    <Layout>
      <h1>{conta.PK_contacto_emergencia}</h1> 
      <h1>{conta.nombre_contacto}</h1> 
      <h1>{conta.cel_contacto}</h1> 
      
      <button 
        className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded" 
        onClick={() => handleDelete(conta.PK_contacto_emergencia)}
      >

        Eliminar
      </button>

      <button
        className="bg-gray-500 hover:bg-gray-800 ml-2 text-white px-5 py-2 rounded" 
        onClick={() => router.push("/contacto/edit/"+conta.PK_contacto_emergencia)}
      >
        Editar
      </button>

    </Layout>
  );
}

export const getServerSideProps = async (context) => {

    const {data: conta} = await axios.get('https://deployed-lsoccer.vercel.app/api/contacto/' + context.query.id)
    return {
        props: {
            conta,
        },
    };
};

export default ContactoPage; 