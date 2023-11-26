import axios from 'axios';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { toast } from 'react-toastify';

export function DirectorForm() {

    const [dire, setDirector] = useState({
        FK_usuario: 0, NSS: "", 
    })
    const router = useRouter()
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            if (router.query.id){
                await axios.put('/api/director/' + router.query.id, dire)
                toast.success('director Editado Correctamente')
            }else {
                await axios.post('/api/director', dire)
                toast.success('director Creado Correctamente')
            }
            router.push('/director')
        } catch (error) {
            
            toast.error(error.response.data.message)
        }
    };

    const handleChange = ({target: {name, value}}) =>
    setDirector ({...dire, [name]: value})

    useEffect(() => {

        const getDirector = async () => {
            const {data} = await axios.get('/api/director/' + router.query.id)
            setDirector(data)
        }

        if (router.query.id){
            getDirector(router.query.id)
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
            value={dire.FK_usuario}
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
            value={dire.NSS}
          />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
            {router.query.id ? "Editar director" : "Crear director"}
          </button>
        </form>
      </div>
    );
}

