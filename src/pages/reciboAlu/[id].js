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
      <h1>Numero de recibo# {rec.PK_recibo}</h1> 
      <h1>Cuenta de pago (Alumno): {rec.KEY_cuenta_pago}</h1> 
      <h1>Fecha de creacion de nota: {rec.fecha_pago}</h1> 
      <h1>Estado de validacion de nota (0/1){rec.validacion}</h1> 

      <button
        className="bg-gray-500 hover:bg-gray-800 ml-2 text-white px-5 py-2 rounded" 
        onClick={() => router.push("/reciboAlu/edit/"+ rec.PK_recibo)}
      >
        Editar
      </button>

    </Layout>
  );
}

export const getServerSideProps = async (context) => {

    const {data: rec} = await axios.get('https://deployed-lsoccer.vercel.app/api/recibo/' + context.query.id)
    return {
        props: {
            rec,
        },
    };
};

export default ReciboPage; 