import Link from "next/link"

export function AdministracionCard({admin}) {
  return (
    <Link legacyBehavior href={`/administracion/${admin.FK_usuario}`} key={admin.FK_usuario}>
    <a>
        <div className="border border-gray-200 shadow-md p-6">
        <h3><p id="layoutTxt">Registro del administrador: </p>{admin.FK_usuario}</h3>
        <h3><p id="layoutTxt">NSS: </p>{admin.NSS}</h3>
        </div>
    </a>
  </Link>
  )
}
