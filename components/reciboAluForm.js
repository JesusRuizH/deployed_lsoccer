import axios from 'axios';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { toast } from 'react-toastify';

export function ReciboAluForm() {

    const [rec, setRecibo] = useState({
        key_cuenta_pago: 0 ,monto_pagado: 0, imagen_pago: "", fecha_pago: "", observaciones: "", validacion: 0,
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
            router.push('/reciboAlu')
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
    

    const [file, setFile] = useState()

    const fileSelectedHandler = (e) =>{
      //console.log(e.target.files[0])
      setFile(
        e.target.files[0]
      )
    }

    const fileUploadHandler = async () =>{
      const formData = new FormData()
      //console.log(file)
      formData.append("file", file)
      formData.append("data", router.query.id)

      await axios.post('http://localhost:3000/api/image', formData).then(res => console.log(res)).catch(err => console.log(err))
    }
    

    return (
        <div className="w-full max-w-xs">

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-10  pt-6 pb-8 mb-2"
        >
          
          <div className="mb-4">
          <label
            htmlFor="key_cuenta_pago"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            key_cuenta_pago:
          </label>
          <input
            type="text"
            name="key_cuenta_pago"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={rec.key_cuenta_pago}
          />
          </div>
              <div className="mb-4">
              <label
                htmlFor="imagen_pago"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Get image prove:
              </label>
              <input
                type="file"
                name="imagen_pago"
                onChange={fileSelectedHandler}
                
                className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                
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

          <button
           onClick={fileUploadHandler}
          >
            {router.query.id ? "Editar recibo" : "Crear recibo"}
          </button>
        </form>
      </div>
    );
}

