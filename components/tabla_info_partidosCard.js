import Link from "next/link"

export function Tabla_info_partidosCard({tabla}) {
  return (
    <Link legacyBehavior href={`/tabla_info_partidos/${tabla.PK_tabla_info_partidos}`} key={tabla.PK_tabla_info_partidos}>
    <a>
        <div className="border border-gray-200 shadow-md p-6">
        <h3><p id="layoutTxt">Folio: </p>{tabla.PK_tabla_info_partidos} </h3>
        <h3><p id="layoutTxt">Categoria asignada a la tabla: </p>{tabla.FK_categoria} </h3>
        <h3><p id="layoutTxt">Fecha del evento: </p>{tabla.fecha_partido} </h3>
        <h3><p id="layoutTxt">Incidentes registrados: </p>{tabla.incidentes} </h3>
        <h3><p id="layoutTxt">Goles a favor: </p>{tabla.goles_favor} </h3>
        <h3><p id="layoutTxt">Goles en contra: </p>{tabla.goles_contra} </h3>
        <h3><p id="layoutTxt">Numero de tarjetas rojas registradas: </p>{tabla.num_tarjetas_rojas} </h3>
        <h3><p id="layoutTxt">Numero de tarjetas amarillas registradas: </p>{tabla.num_tarjetas_amarillas} </h3>
        <h3><p id="layoutTxt">Resultado final (0, 1): </p>{tabla.resultado} </h3>
        <h3><p id="layoutTxt">Informacion extra del evento: </p>{tabla.datos_extra} </h3>
        <h3><p id="layoutTxt">Nombre del entrenador encargado: </p>{tabla.nombre_encargado} </h3>

        </div>
    </a>
  </Link>
  )
}
