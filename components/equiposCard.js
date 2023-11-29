import Link from "next/link"

export function EquiposCard({equi}) {
  return (
    <Link legacyBehavior href={`/equipos/${equi.pk_equipo}`} key={equi.pk_equipo}>
    <a>
        <div className="border border-gray-200 shadow-md p-6">
        <h3><p id="layoutTxt">Nombre del equipo: </p>{equi.nombre_equipo}</h3>
        <h3><p id="layoutTxt">Posicion del equipo en liga: </p>{equi.posicion_tabla}</h3>
        <h3><p id="layoutTxt">Liga: </p>{equi.fk_liga}</h3>
        </div>
    </a>
  </Link>
  )
}
