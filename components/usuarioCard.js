import Link from "next/link"

export function UsuarioCard({usu}) {
  return (
    <Link legacyBehavior href={`/usuario/${usu.PK_usuario}`} key={usu.PK_usuario}>
    <a>
        <div className="border border-gray-200 shadow-md p-6">
        <h3><p id="layoutTxt">codigo: </p>{usu.PK_usuario} </h3>
        <h3><p id="layoutTxt">Nombre del usuario: </p>{usu.nombre_usuario}</h3>
        <h3><p id="layoutTxt">Apellido del usuario: </p>{usu.apellidos_usuario} </h3>
        <h3><p id="layoutTxt">Fecha de nacimiento del usuario: </p>{usu.fecha_naci_usuario} </h3>
        <h3><p id="layoutTxt">Celular usuario: </p>{usu.celular_usuario} </h3>
        <h3><p id="layoutTxt">Codigo del contacto de emergencia: </p>{usu.FK_contacto_emergencia}</h3>
        <h3><p id="layoutTxt">Tipo de cuenta: </p>{usu.FK_tipo_cuenta} </h3>

        <h3><p id="layoutTxt">Login: </p>{usu.usuario} </h3>
        <h3><p id="layoutTxt">Password: </p>{usu.pw}</h3>
        <h3><p id="layoutTxt">Correo: </p>{usu.correo} </h3>
        <h3><p id="layoutTxt">Estado: </p>{usu.estado} </h3>
        </div>
    </a>
  </Link>
  )
}
