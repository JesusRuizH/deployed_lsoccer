import Link from "next/link"

export function Tipo_cuentaCard({tipo_c}) {
  return (
    <Link legacyBehavior href={`/tipo_cuenta/${tipo_c.pk_tipo_cuenta}`} key={tipo_c.pk_tipo_cuenta}>
    <a>
        <div className="border border-gray-200 shadow-md p-6">
        <h3><p id="layoutTxt">Identificador de tipo de cuenta: </p>{tipo_c.pk_tipo_cuenta} </h3>
        <h3><p id="layoutTxt">Tipo de cuenta: </p>{tipo_c.tipo} </h3>
        </div>
    </a>
  </Link>
  )
}
