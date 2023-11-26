import axios from 'axios';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { toast } from 'react-toastify';

export function CategoriaForm() {

    const [cate, setCategoria] = useState({
        fecha_categoria_ini: "",fecha_categoria_fin: "", turno: "",
    })
    const router = useRouter()
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            if (router.query.id){
                await axios.put('/api/categoria/' + router.query.id, cate)
                toast.success('categoria Editado Correctamente')
            }else {
                await axios.post('/api/categoria', cate)
                toast.success('categoria Creado Correctamente')
            }
            router.push('/categoria')
        } catch (error) {
            
            toast.error(error.response.data.message)
        }
    };

    const handleChange = ({target: {name, value}}) =>
    setCategoria ({...cate, [name]: value})

    useEffect(() => {

        const getCategoria = async () => {
            const {data} = await axios.get('/api/categoria/' + router.query.id)
            setCategoria(data)
        }

        if (router.query.id){
            getCategoria(router.query.id)
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
            value={cate.fecha_categoria_ini}
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
            value={cate.fecha_categoria_fin}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="turno"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            turno:
          </label>
          <input
            type="text"
            name="turno"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={cate.turno}
          />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
            {router.query.id ? "Editar categoria" : "Crear categoria"}
          </button>
        </form>
      </div>
    );
}

