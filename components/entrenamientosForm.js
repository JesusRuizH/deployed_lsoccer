import axios from 'axios';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { toast } from 'react-toastify';

export function EntrenamientosForm() {

    const [entr, setEntrenamientos] = useState({
        FK_categoria: 0,dias_entrenamiento: "",horarios_entrena_ini: "", horarios_entrena_fin: "",
    })
    const router = useRouter()
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            if (router.query.id){
                await axios.put('/api/entrenamientos/' + router.query.id, entr)
                toast.success('entrenamientos Editado Correctamente')
            }else {
                await axios.post('/api/entrenamientos', entr)
                toast.success('entrenamientos Creado Correctamente')
            }
            router.push('/entrenamientos')
        } catch (error) {
            
            toast.error(error.response.data.message)
        }
    };

    const handleChange = ({target: {name, value}}) =>
    setEntrenamientos ({...entr, [name]: value})

    useEffect(() => {

        const getEntrenamientos = async () => {
            const {data} = await axios.get('/api/entrenamientos/' + router.query.id)
            setEntrenamientos(data)
        }

        if (router.query.id){
            getEntrenamientos(router.query.id)
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
            FK_categoria:
          </label>
          <input
            type="text"
            name="FK_categoria"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={entr.FK_categoria}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="dias_entrenamiento"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            dias_entrenamiento:
          </label>
          <input
            type="text"
            name="dias_entrenamiento"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={entr.dias_entrenamiento}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="horarios_entrena_ini"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            horarios_entrena_ini:
          </label>
          <input
            type="text"
            name="horarios_entrena_ini"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={entr.horarios_entrena_ini}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="horarios_entrena_fin"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            horarios_entrena_fin:
          </label>
          <input
            type="text"
            name="horarios_entrena_fin"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={entr.horarios_entrena_fin}
          />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
            {router.query.id ? "Editar entrenamientos" : "Crear entrenamientos"}
          </button>
        </form>
      </div>
    );
}

