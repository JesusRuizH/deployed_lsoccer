import axios from 'axios';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { toast } from 'react-toastify';

export function ProfesorForm() {

    const [prof, setProfesor] = useState({
      fk_usuario: 0, fk_cate_asignadas: 0,
    })
    const router = useRouter()
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            if (router.query.id){
                await axios.put('/api/profesor/' + router.query.id, prof)
                toast.success('profesor Editado Correctamente')
            }else {
                await axios.post('/api/profesor', prof)
                toast.success('profesor Creado Correctamente')
            }
            router.push('/profesor')
        } catch (error) {
            
            toast.error(error.response.data.message)
        }
    };

    const handleChange = ({target: {name, value}}) =>
    setProfesor ({...prof, [name]: value})

    useEffect(() => {

        const getProfesor = async () => {
            const {data} = await axios.get('/api/profesor/' + router.query.id)
            setProfesor(data)
        }

        if (router.query.id){
            getProfesor(router.query.id)
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
            htmlFor="fk_usuario"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            fk_usuario:
          </label>
          <input
            type="text"
            name="fk_usuario"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={prof.fk_usuario}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="fk_cate_asignadas"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            fk_cate_asignadas:
          </label>
          <input
            type="text"
            name="fk_cate_asignadas"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={prof.fk_cate_asignadas}
          />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
            {router.query.id ? "Editar profesor" : "Crear profesor"}
          </button>
        </form>
      </div>
    );
}

