import axios from 'axios';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import { toast } from 'react-toastify';

export function UsuarioForm() {

    const [usu, setUsuario] = useState({
      nombre_usuario: "", apellidos_usuario: "", fecha_naci_usuario: "", celular_usuario: "", FK_contacto_emergencia: "", FK_tipo_cuenta: "", usuario: "",pw: "", correo: "", estado: 0,
    })
    const router = useRouter()
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            if (router.query.id){
                await axios.put('/api/usuario/' + router.query.id, usu)
                toast.success('usuario Editado Correctamente')
            }else {
                await axios.post('/api/usuario', usu)
                toast.success('usuario Creado Correctamente')
            }
            router.push('/usuario')
        } catch (error) {
            
            toast.error(error.response.data.message)
        }
    };

    const handleChange = ({target: {name, value}}) =>
    setUsuario ({...usu, [name]: value})

    useEffect(() => {

        const getUsuario = async () => {
            const {data} = await axios.get('/api/usuario/' + router.query.id)
            setUsuario(data)
        }

        if (router.query.id){
            getUsuario(router.query.id)
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
            htmlFor="nombre_usuario"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Nombre usuario:
          </label>
          <input
            type="text"
            name="nombre_usuario"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={usu.nombre_usuario}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="apellidos_usuario"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Apellidos usuario:
          </label>
          <input
            type="text"
            name="apellidos_usuario"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={usu.apellidos_usuario}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="fecha_naci_usuario"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            fecha de nacimiento del usuario:
          </label>
          <input
            type="text"
            name="fecha_naci_usuario"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={usu.fecha_naci_usuario}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="celular_usuario"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            celular del usuario:
          </label>
          <input
            type="text"
            name="celular_usuario"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={usu.celular_usuario}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="FK_contacto_emergencia"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            FK_contacto_emergencia:
          </label>
          <input
            type="text"
            name="FK_contacto_emergencia"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={usu.FK_contacto_emergencia}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="FK_tipo_cuenta"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            FK_tipo_cuenta:
          </label>
          <input
            type="text"
            name="FK_tipo_cuenta"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={usu.FK_tipo_cuenta}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="usuario"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Usuario:
          </label>
          <input
            type="text"
            name="usuario"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={usu.usuario}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="pw"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password:
          </label>
          <input
            type="text"
            name="pw"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={usu.pw}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="correo"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Correo:
          </label>
          <input
            type="text"
            name="correo"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={usu.correo}
          />
          </div>

          <div className="mb-4">
          <label
            htmlFor="estado"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            estado:
          </label>
          <input
            type="text"
            name="estado"
            onChange={handleChange}
            className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={usu.estado}
          />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
            {router.query.id ? "Editar Usuario" : "Crear Usuario"}
          </button>
        </form>
      </div>
    );
}

