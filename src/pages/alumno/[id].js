import { Layout } from '../../../components/Layout'
import axios from 'axios'
import {useRouter} from 'next/router'
import { toast } from 'react-toastify'

function AlumnoPage({ alu }) { 
  
    const router = useRouter()

    const handleDelete = async (id) => {
      try {
        await axios.delete('/api/alumno/' + id)
        router.push('/alumno')
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  //when I press the button comes here
  return (
    <Layout>
      <h1>{alu.KEY_cuenta_pago}</h1> 
      <h1>{alu.FK_usuario}</h1> 
      <h1>{alu.FK_categoria}</h1> 
      <h1>{alu.jersey}</h1> 
      
      <button 
        className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded" 
        onClick={() => handleDelete(alu.FK_usuario)}
      >

        Eliminar
      </button>

      <button
        className="bg-gray-500 hover:bg-gray-800 ml-2 text-white px-5 py-2 rounded" 
        onClick={() => router.push("/alumno/edit/"+alu.FK_usuario)}
      >
        Editar
      </button>

    </Layout>
  );
}

export const getServerSideProps = async (context) => {

    const {data: alu} = await axios.get('http://localhost:3000/api/alumno/' + context.query.id)
    return {
        props: {
            alu,
        },
    };
};

export default AlumnoPage; 