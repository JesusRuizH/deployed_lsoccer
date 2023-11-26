import axios from 'axios';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { toast } from 'react-toastify';

export function Tabla_info_partidosForm() {

    const [tabla, setTabla_info_partidos] = useState({
        FK_categoria: 0,fecha_partido: "", incidentes: "",goles_favor: 0,goles_contra: 0, num_tarjetas_rojas: 0,num_tarjetas_amarillas: 0,resultado: 0, datos_extra: "", nombre_encargado: "",
    })
    const router = useRouter()
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            if (router.query.id){
                await axios.put('/api/tabla_info_partidos/' + router.query.id, tabla)
                toast.success('tabla_info_partidos Editado Correctamente')
            }else {
                await axios.post('/api/tabla_info_partidos', tabla)
                toast.success('tabla_info_partidos Creado Correctamente')
            }
            router.push('/tabla_info_partidos')
        } catch (error) {
            
            toast.error(error.response.data.message)
        }
    };

    const handleChange = ({target: {name, value}}) =>
    setTabla_info_partidos ({...tabla, [name]: value})

    useEffect(() => {

        const getTabla_info_partidos = async () => {
            const {data} = await axios.get('/api/tabla_info_partidos/' + router.query.id)
            setTabla_info_partidos(data)
        }

        if (router.query.id){
            getTabla_info_partidos(router.query.id)
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
            htmlFor="FK_categoria"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Folio de categoria a la que pertenece la tabla:
          </label>
          <input
            type="text"
            name="FK_categoria"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={tabla.FK_categoria}
          />
          </div>
          
          <div className="mb-4">
          <label
            htmlFor="fecha_partido"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
           Fecha del evento:
          </label>
          <input
            type="text"
            name="fecha_partido"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={tabla.fecha_partido}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="incidentes"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
           Incidentes si hubo:
          </label>
          <input
            type="text"
            name="incidentes"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={tabla.incidentes}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="goles_favor"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
           goles a favor:
          </label>
          <input
            type="text"
            name="goles_favor"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={tabla.goles_favor}
          />
          </div>
          
          <div className="mb-4">
          <label
            htmlFor="goles_contra"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
           goles en contra:
          </label>
          <input
            type="text"
            name="goles_contra"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={tabla.goles_contra}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="num_tarjetas_rojas"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
           numero de tarjetas rojas:
          </label>
          <input
            type="text"
            name="num_tarjetas_rojas"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={tabla.num_tarjetas_rojas}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="num_tarjetas_amarillas"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
           numero de tarjetas amarillas:
          </label>
          <input
            type="text"
            name="num_tarjetas_amarillas"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={tabla.num_tarjetas_amarillas}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="resultado"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
           Resultado:
          </label>
          <input
            type="text"
            name="resultado"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={tabla.resultado}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="datos_extra"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
           datos extra:
          </label>
          <input
            type="text"
            name="datos_extra"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={tabla.datos_extra}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="nombre_encargado"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
           nombre del profesor encargado:
          </label>
          <input
            type="text"
            name="nombre_encargado"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={tabla.nombre_encargado}
          />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
            {router.query.id ? "Editar tabla_info_partidos" : "Crear tabla_info_partidos"}
          </button>
        </form>
      </div>
    );
}

