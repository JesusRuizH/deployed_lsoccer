import Link from "next/link"

export function ContactoCard({conta}) {
  return (
    <Link legacyBehavior href={`/contacto/${conta.pk_contacto_emergencia}`} key={conta.pk_contacto_emergencia}>
    <a>
        <div className="border border-gray-200 shadow-md p-6">
        <h3><p id="layoutTxt">Clave del contacto: </p>{conta.pk_contacto_emergencia}</h3>
        <h3><p id="layoutTxt">Nombre del contacto: </p>{conta.nombre_contacto}</h3>
        <h3><p id="layoutTxt">Apellidos del contacto: </p>{conta.apellido_contacto}</h3>
        <h3><p id="layoutTxt">Telefono del contacto: </p>{conta.telefono_contacto}</h3>
        <h3><p id="layoutTxt">Celular del contacto: </p>{conta.cel_contacto}</h3>
        </div>
    </a>
  </Link>
  )
}
