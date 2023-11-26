import axios from 'axios';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { toast } from 'react-toastify';

export function Tipo_cuentaForm() {

    const [tipo_c, setTipo_cuenta] = useState({
        tipo: "",
    })
    const router = useRouter()
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            if (router.query.id){
                await axios.put('/api/tipo_cuenta/' + router.query.id, tipo_c)
                toast.success('Tipo de cuenta Editado Correctamente')
            }else {
                await axios.post('/api/tipo_cuenta', tipo_c)
                toast.success('Tipo de cuenta Creado Correctamente')
            }
            router.push('/tipo_cuenta')
        } catch (error) {
            
            toast.error(error.response.data.message)
        }
    };

    const handleChange = ({target: {name, value}}) =>
    setTipo_cuenta ({...tipo_c, [name]: value})

    useEffect(() => {

        const getTipo_cuenta = async () => {
            const {data} = await axios.get('/api/tipo_cuenta/' + router.query.id)
            setTipo_cuenta(data)
        }

        if (router.query.id){
            getTipo_cuenta(router.query.id)
        }
    }, [])
    

    return (
        <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-10  pt-6 pb-8 mb-2"
        >
          
          <div className="mb-4">
          <label
            htmlFor="tipo"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Tipo de cuenta:
          </label>
          <input
            type="text"
            name="tipo"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={tipo_c.tipo}
          />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
            {router.query.id ? "Editar tipo de cuenta" : "Crear tipo de cuenta"}
          </button>
        </form>
      </div>
    );
}

