//import { Layout } from '../../../components/Layout'
import axios from 'axios'
import {useRouter} from 'next/router'
import { toast } from 'react-toastify'

function UsuarioPage({ usu }) { 
  
    const router = useRouter()

    const handleDelete = async (id) => {
      try {
        await axios.delete('/api/usuario/' + id)
        router.push('/usuario')
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  //when I press the button comes here
  return (
    <div>
      <h1>{usu.nombre_usuario}</h1> 
      <h1>{usu.apellidos_usuario}</h1> 
      <h1>{usu.fecha_naci_usuario}</h1> 
      <h1>{usu.celular_usuario}</h1> 
      <h1>{usu.FK_contacto_emergencia}</h1> 
      <h1>{usu.FK_tipo_cuenta}</h1> 

      <h1>{usu.usuario}</h1> 
      <h1>{usu.pw}</h1> 
      <h1>{usu.correo}</h1> 
      <h1>{usu.estado}</h1> 
      
      <button 
        className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded" 
        onClick={() => handleDelete(usu.PK_usuario)}
      >

        Eliminar
      </button>

      <button
        className="bg-gray-500 hover:bg-gray-800 ml-2 text-white px-5 py-2 rounded" 
        onClick={() => router.push("/usuario/edit/"+usu.PK_usuario)}
      >
        Editar
      </button>

    </div>
  );
}

export const getServerSideProps = async (context) => {

    const {data: usu} = await axios.get('http://localhost:3000/api/usuario/' + context.query.id)
    return {
        props: {
           usu,
        },
    };
};

export default UsuarioPage; 