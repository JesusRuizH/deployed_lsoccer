import Link from "next/link"

export function AdministracionCard({admin}) {
  return (
    <Link legacyBehavior href={`/administracion/${admin.fk_usuario}`} key={admin.fk_usuario}>
    <a>
        <div className="border border-gray-200 shadow-md p-6">
        <h3><p id="layoutTxt">Registro del administrador: </p>{admin.fk_usuario}</h3>
        <h3><p id="layoutTxt">NSS: </p>{admin.nss}</h3>
        </div>
    </a>
  </Link>
  )
}
