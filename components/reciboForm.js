import axios from 'axios';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { toast } from 'react-toastify';

export function ReciboForm() {

    const [rec, setRecibo] = useState({
        KEY_cuenta_pago: 0 ,monto_pagado: 0, imagen_pago: "", fecha_pago: "", observaciones: "", validacion: 0,
    })
    const router = useRouter()
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            if (router.query.id){
                await axios.put('/api/recibo/' + router.query.id, rec)
                toast.success('recibo Editado Correctamente')
            }else {
                await axios.post('/api/recibo', rec)
                toast.success('recibo Creado Correctamente')
            }
            router.push('/recibo')
        } catch (error) {
            
            toast.error(error.response.data.message)
        }
    };

    const handleChange = ({target: {name, value}}) =>
    setRecibo ({...rec, [name]: value})

    useEffect(() => {

        const getRecibo = async () => {
            const {data} = await axios.get('/api/recibo/' + router.query.id)
            setRecibo(data)
        }

        if (router.query.id){
            getRecibo(router.query.id)
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
            value={rec.KEY_cuenta_pago}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="monto_pagado"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            monto_pagado:
          </label>
          <input
            type="text"
            name="monto_pagado"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={rec.monto_pagado}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="fecha_pago"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            fecha_pago:
          </label>
          <input
            type="text"
            name="fecha_pago"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={rec.fecha_pago}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="observaciones"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            observaciones:
          </label>
          <input
            type="text"
            name="observaciones"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={rec.observaciones}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="validacion"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            validacion:
          </label>
          <input
            type="text"
            name="validacion"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={rec.validacion}
          />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
            {router.query.id ? "Editar recibo" : "Crear recibo"}
          </button>
        </form>
      </div>
    );
}

