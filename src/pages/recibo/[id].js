import { Layout } from '../../../components/Layout'
import axios from 'axios'
import {useRouter} from 'next/router'
import { toast } from 'react-toastify'

function ReciboPage({ rec }) { 
  
    const router = useRouter()

    const handleDelete = async (id) => {
      try {
        await axios.delete('/api/recibo/' + id)
        router.push('/recibo')
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  //when I press the button comes here
  return (
    <Layout>
      <h1>{rec.PK_recibo}</h1> 
      <h1>{rec.KEY_cuenta_pago}</h1> 
      <h1>{rec.fecha_pago}</h1> 
      <h1>{rec.validacion}</h1> 
      
      <button 
        className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded" 
        onClick={() => handleDelete(rec.PK_recibo)}
      >

        Eliminar
      </button>

      <button
        className="bg-gray-500 hover:bg-gray-800 ml-2 text-white px-5 py-2 rounded" 
        onClick={() => router.push("/recibo/edit/"+ rec.PK_recibo)}
      >
        Editar
      </button>

    </Layout>
  );
}

export const getServerSideProps = async (context) => {

    const {data: rec} = await axios.get('http://localhost:3000/api/recibo/' + context.query.id)
    return {
        props: {
            rec,
        },
    };
};

export default ReciboPage; 