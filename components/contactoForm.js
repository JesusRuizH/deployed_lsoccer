import axios from 'axios';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { toast } from 'react-toastify';

export function ContactoForm() {

    const [conta, setContacto] = useState({
        nombre_contacto: "",apellido_contacto: "", telefono_contacto: "", cel_contacto: "",
    })
    const router = useRouter()
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            if (router.query.id){
                await axios.put('/api/contacto/' + router.query.id, conta)
                toast.success('contacto Editado Correctamente')
            }else {
                await axios.post('/api/contacto', conta)
                toast.success('contacto Creado Correctamente')
            }
            router.push('http://localhost:3000/contacto')
        } catch (error) {
            
            toast.error(error.response.data.message)
        }
    };

    const handleChange = ({target: {name, value}}) =>
    setContacto ({...conta, [name]: value})

    useEffect(() => {

        const getContacto = async () => {
            const {data} = await axios.get('/api/contacto/' + router.query.id)
            setContacto(data)
        }

        if (router.query.id){
            getContacto(router.query.id)
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
            htmlFor="nombre_contacto"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            nombre_contacto:
          </label>
          <input
            type="text"
            name="nombre_contacto"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={conta.nombre_contacto}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="apellido_contacto"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            apellido_contacto:
          </label>
          <input
            type="text"
            name="apellido_contacto"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={conta.apellido_contacto}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="telefono_contacto"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            telefono_contacto:
          </label>
          <input
            type="text"
            name="telefono_contacto"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={conta.telefono_contacto}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="cel_contacto"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            cel_contacto:
          </label>
          <input
            type="text"
            name="cel_contacto"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={conta.cel_contacto}
          />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
            {router.query.id ? "Editar contacto" : "Crear contacto"}
          </button>
        </form>
      </div>
    );
}

