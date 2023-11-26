import axios from 'axios';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { toast } from 'react-toastify';

export function Cate_asignadasForm() {

    const [c_asig, setCate_asignadas] = useState({
        cate_uno: 0, cate_dos: 0, cate_tres: 0,
    })
    const router = useRouter()
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            if (router.query.id){
                await axios.put('/api/cate_asignadas/' + router.query.id, c_asig)
                toast.success('cate_asignadas Editado Correctamente')
            }else {
                await axios.post('/api/cate_asignadas', c_asig)
                toast.success('cate_asignadas Creado Correctamente')
            }
            router.push('/cate_asignadas')
        } catch (error) {
            
            toast.error(error.response.data.message)
        }
    };

    const handleChange = ({target: {name, value}}) =>
    setCate_asignadas ({...c_asig, [name]: value})

    useEffect(() => {

        const getCate_asignadas = async () => {
            const {data} = await axios.get('/api/cate_asignadas/' + router.query.id)
            setCate_asignadas(data)
        }

        if (router.query.id){
            getCate_asignadas(router.query.id)
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
            htmlFor="cate_uno"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            cate_uno:
          </label>
          <input
            type="text"
            name="cate_uno"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={c_asig.cate_uno}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="cate_dos"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            cate_dos:
          </label>
          <input
            type="text"
            name="cate_dos"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={c_asig.cate_dos}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="cate_tres"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            cate_tres:
          </label>
          <input
            type="text"
            name="cate_tres"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={c_asig.cate_tres}
          />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
            {router.query.id ? "Editar cate_asignadas" : "Crear cate_asignadas"}
          </button>
        </form>
      </div>
    );
}

