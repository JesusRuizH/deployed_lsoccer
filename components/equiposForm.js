import axios from 'axios';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { toast } from 'react-toastify';

export function EquiposForm() {

    const [equi, setEquipos] = useState({
        nombre_equipo: "",posicion_tabla: 0, fk_liga: 0,
    })
    const router = useRouter()
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            if (router.query.id){
                await axios.put('/api/equipos/' + router.query.id, equi)
                toast.success('equipos Editado Correctamente')
            }else {
                await axios.post('/api/equipos', equi)
                toast.success('equipos Creado Correctamente')
            }
            router.push('/equipos')
        } catch (error) {
            
            toast.error(error.response.data.message)
        }
    };

    const handleChange = ({target: {name, value}}) =>
    setEquipos ({...equi, [name]: value})

    useEffect(() => {

        const getEquipos = async () => {
            const {data} = await axios.get('/api/equipos/' + router.query.id)
            setEquipos(data)
        }

        if (router.query.id){
            getEquipos(router.query.id)
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
            htmlFor="nombre_equipo"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            nombre_equipo:
          </label>
          <input
            type="text"
            name="nombre_equipo"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={equi.nombre_equipo}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="posicion_tabla"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            posicion_tabla:
          </label>
          <input
            type="text"
            name="posicion_tabla"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={equi.posicion_tabla}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="fk_liga"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            fk_liga:
          </label>
          <input
            type="text"
            name="fk_liga"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={equi.fk_liga}
          />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
            {router.query.id ? "Editar Equipo" : "Crear Equipo"}
          </button>
        </form>
      </div>
    );
}

