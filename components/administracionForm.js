import axios from 'axios';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { toast } from 'react-toastify';

export function AdministracionForm() {

    const [admin, setAdministracion] = useState({
        FK_usuario: 0, NSS: "",
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
            router.push('/administracion')
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
            value={admin.FK_usuario}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="NSS"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
           NSS:
          </label>
          <input
            type="text"
            name="NSS"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={admin.NSS}
          />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
            {router.query.id ? "Editar administracion" : "Crear administracion"}
          </button>
        </form>
      </div>
    );
}

