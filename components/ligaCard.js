import Link from "next/link"

export function LigaCard({lig}) {
  return (
    <Link legacyBehavior href={`/liga/${lig.pk_liga}`} key={lig.pk_liga}>
    <a>
        <div className="border border-gray-200 shadow-md p-6">
        <h3><p id="layoutTxt">Nombre de la liga: </p>{lig.nombre_liga} </h3>
        <h3><p id="layoutTxt">Fecha de inicio de la liga: </p>{lig.fecha_categoria_ini} </h3>
        <h3><p id="layoutTxt">Fecha de termino de la liga: </p>{lig.fecha_categoria_fin} </h3>
        
        </div>
    </a>
  </Link>
  )
}
