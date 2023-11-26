import axios from 'axios';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { toast } from 'react-toastify';

export function AlumnoForm() {

    const [alu, setAlumno] = useState({
        FK_usuario: 0,FK_categoria: 0, posicion_jugador: "", pago_mensual: 0, pago_liga: 0, jersey: "", KEY_cuenta_pago: 0,
    })
    const router = useRouter()
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            if (router.query.id){
                await axios.put('/api/alumno/' + router.query.id, alu)
                toast.success('alumno Editado Correctamente')
            }else {
                await axios.post('/api/alumno', alu)
                toast.success('alumno Creado Correctamente')
            }
            router.push('/alumno')
        } catch (error) {
            
            toast.error(error.response.data.message)
        }
    };

    const handleChange = ({target: {name, value}}) =>
    setAlumno ({...alu, [name]: value})

    useEffect(() => {

        const getAlumno = async () => {
            const {data} = await axios.get('/api/alumno/' + router.query.id)
            setAlumno(data)
        }

        if (router.query.id){
            getAlumno(router.query.id)
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
            htmlFor="FK_usuario"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            FK_usuario:
          </label>
          <input
            type="text"
            name="FK_usuario"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={alu.FK_usuario}
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
            value={alu.FK_categoria}
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
            value={alu.posicion_jugador}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="pago_mensual"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            pago_mensual:
          </label>
          <input
            type="text"
            name="pago_mensual"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={alu.pago_mensual}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="pago_liga"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            pago_liga:
          </label>
          <input
            type="text"
            name="pago_liga"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={alu.pago_liga}
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
            value={alu.jersey}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="KEY_cuenta_pago"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            KEY_cuenta_pago:
          </label>
          <input
            type="text"
            name="KEY_cuenta_pago"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={alu.KEY_cuenta_pago}
          />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
            {router.query.id ? "Editar alumno" : "Crear alumno"}
          </button>
        </form>
      </div>
    );
}

