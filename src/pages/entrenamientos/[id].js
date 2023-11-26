import { Layout } from '../../../components/Layout'
import axios from 'axios'
import {useRouter} from 'next/router'
import { toast } from 'react-toastify'

function EntrenamientosPage({ entr }) { 
  
    const router = useRouter()

    const handleDelete = async (id) => {
      try {
        await axios.delete('/api/entrenamientos/' + id)
        router.push('/entrenamientos')
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  //when I press the button comes here
  return (
    <Layout>
      <h1>{entr.PK_entrenamientos}</h1> 
      <h1>{entr.FK_categoria}</h1> 
      <h1>{entr.horarios_entrena_ini}</h1> 
      
      <button 
        className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded" 
        onClick={() => handleDelete(entr.PK_entrenamientos)}
      >

        Eliminar
      </button>

      <button
        className="bg-gray-500 hover:bg-gray-800 ml-2 text-white px-5 py-2 rounded" 
        onClick={() => router.push("/entrenamientos/edit/"+entr.PK_entrenamientos)}
      >
        Editar
      </button>

    </Layout>
  );
}

export const getServerSideProps = async (context) => {

    const {data: entr} = await axios.get('http://localhost:3000/api/entrenamientos/' + context.query.id)
    return {
        props: {
            entr,
        },
    };
};

export default EntrenamientosPage; 