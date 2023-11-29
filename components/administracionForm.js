import axios from 'axios';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { toast } from 'react-toastify';

export function AdministracionForm() {

    const [admin, setAdministracion] = useState({
        fk_usuario: 0, nss: "",
    })
    const router = useRouter()
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            if (router.query.id){
                await axios.put('/api/administracion/' + router.query.id, admin)
                toast.success('administracion Editado Correctamente')
            }else {
                await axios.post('/api/administracion', admin)
                toast.success('administracion Creado Correctamente')
            }
            router.push('http://localhost:3000/administracion')
        } catch (error) {
            
            toast.error(error.response.data.message)
        }
    };

    const handleChange = ({target: {name, value}}) =>
    setAdministracion ({...admin, [name]: value})

    useEffect(() => {

        const getAdministracion = async () => {
            const {data} = await axios.get('/api/administracion/' + router.query.id)
            setAdministracion(data)
        }

        if (router.query.id){
            getAdministracion(router.query.id)
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
            value={admin.fk_usuario}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="nss"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
           nss:
          </label>
          <input
            type="text"
            name="nss"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={admin.nss}
          />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
            {router.query.id ? "Editar administracion" : "Crear administracion"}
          </button>
        </form>
      </div>
    );
}

