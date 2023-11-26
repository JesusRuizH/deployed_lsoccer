import axios from 'axios';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { toast } from 'react-toastify';

export function EventosForm() {

    const [eve, setEventos] = useState({
        FK_categoria: 0, descripcion_evento: "",fecha_evento: "",ubicacion_evento: "", hora_ini:0, hora_fin:0, nombre_eve: "",
    })
    const router = useRouter()
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            if (router.query.id){
                await axios.put('/api/eventos/' + router.query.id, eve)
                toast.success('eventos Editado Correctamente')
            }else {
                await axios.post('/api/eventos', eve)
                await axios.post('/api/calendar', eve)
                toast.success('eventos Creado Correctamente')
            }
            router.push('/eventos')
        } catch (error) {
            
            toast.error(error.response.data.message)
        }
    };

    const handleChange = ({target: {name, value}}) =>
    setEventos ({...eve, [name]: value})

    useEffect(() => {

        const getEventos = async () => {
            const {data} = await axios.get('/api/eventos/' + router.query.id)
            setEventos(data)
        }

        if (router.query.id){
            getEventos(router.query.id)
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
            htmlFor="nombre_eve"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            nombre_eve:
          </label>
          <input
            type="text"
            name="nombre_eve"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={eve.nombre_eve}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="FK_categoria"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            FK_categoria:
          </label>
          <input
            type="text"
            name="FK_categoria"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={eve.FK_categoria}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="descripcion_evento"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            descripcion_evento:
          </label>
          <input
            type="text"
            name="descripcion_evento"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={eve.descripcion_evento}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="fecha_evento"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            fecha_evento:
          </label>
          <input
            type="text"
            name="fecha_evento"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={eve.fecha_evento}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="ubicacion_evento"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            ubicacion_evento:
          </label>
          <input
            type="text"
            name="ubicacion_evento"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={eve.ubicacion_evento}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="hora_ini"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            hora_ini:
          </label>
          <input
            type="text"
            name="hora_ini"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={eve.hora_ini}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="hora_fin"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            hora_fin:
          </label>
          <input
            type="text"
            name="hora_fin"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={eve.hora_fin}
          />
          </div>


          <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
            {router.query.id ? "Editar evento" : "Crear evento"}
          </button>
        </form>
      </div>
    );
}

