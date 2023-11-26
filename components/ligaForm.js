import axios from 'axios';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { toast } from 'react-toastify';

export function LigaForm() {

    const [lig, setLiga] = useState({
        nombre_liga: "",fecha_categoria_ini: "", fecha_categoria_fin: "",
    })
    const router = useRouter()
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            if (router.query.id){
                await axios.put('/api/liga/' + router.query.id, lig)
                toast.success('liga Editado Correctamente')
            }else {
                await axios.post('/api/liga', lig)
                toast.success('liga Creado Correctamente')
            }
            router.push('/liga')
        } catch (error) {
            
            toast.error(error.response.data.message)
        }
    };

    const handleChange = ({target: {name, value}}) =>
    setLiga ({...lig, [name]: value})

    useEffect(() => {

        const getLiga = async () => {
            const {data} = await axios.get('/api/liga/' + router.query.id)
            setLiga(data)
        }

        if (router.query.id){
            getLiga(router.query.id)
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
            htmlFor="nombre_liga"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            nombre_liga:
          </label>
          <input
            type="text"
            name="nombre_liga"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={lig.nombre_liga}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="fecha_categoria_ini"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            fecha_categoria_ini:
          </label>
          <input
            type="text"
            name="fecha_categoria_ini"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={lig.fecha_categoria_ini}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="fecha_categoria_fin"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            fecha_categoria_fin:
          </label>
          <input
            type="text"
            name="fecha_categoria_fin"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={lig.fecha_categoria_fin}
          />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
            {router.query.id ? "Editar Liga" : "Crear Liga"}
          </button>
        </form>
      </div>
    );
}

