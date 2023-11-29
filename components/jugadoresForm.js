import axios from 'axios';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { toast } from 'react-toastify';

export function JugadoresForm() {

    const [juga, setJugadores] = useState({
        fk_equipo: 0, nombre_jugador: "", posicion_jugador: "", jersey: 0,
    })
    const router = useRouter()
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            if (router.query.id){
                await axios.put('/api/jugadores/' + router.query.id, juga)
                toast.success('jugadores Editado Correctamente')
            }else {
                await axios.post('/api/jugadores', juga)
                toast.success('jugadores Creado Correctamente')
            }
            router.push('/jugadores')
        } catch (error) {
            
            toast.error(error.response.data.message)
        }
    };

    const handleChange = ({target: {name, value}}) =>
    setJugadores ({...juga, [name]: value})

    useEffect(() => {

        const getJugadores = async () => {
            const {data} = await axios.get('/api/jugadores/' + router.query.id)
            setJugadores(data)
        }

        if (router.query.id){
            getJugadores(router.query.id)
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
            htmlFor="fk_equipo"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            fk_equipo:
          </label>
          <input
            type="text"
            name="fk_equipo"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={juga.fk_equipo}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="nombre_jugador"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            nombre_jugador:
          </label>
          <input
            type="text"
            name="nombre_jugador"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={juga.nombre_jugador}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="posicion_jugador"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            posicion_jugador:
          </label>
          <input
            type="text"
            name="posicion_jugador"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={juga.posicion_jugador}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="jersey"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            jersey:
          </label>
          <input
            type="text"
            name="jersey"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={juga.jersey}
          />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
            {router.query.id ? "Editar jugador" : "Crear jugador"}
          </button>
        </form>
      </div>
    );
}

