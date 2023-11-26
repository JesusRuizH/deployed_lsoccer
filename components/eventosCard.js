import Link from "next/link"

export function EventosCard({eve}) {
  return (
    <Link legacyBehavior href={`/eventos/${eve.PK_eventos}`} key={eve.PK_eventos}>
    <a>
        <div className="border border-gray-200 shadow-md p-6">
        <h3><p id="layoutTxt">Categoria a la que va dirigido el evento: </p>{eve.FK_categoria}</h3>
        <h3><p id="layoutTxt">Descripcion del evento: </p>{eve.descripcion_evento}</h3>
        <h3><p id="layoutTxt">Fecha del evento: </p>{eve.fecha_evento} </h3>
        <h3><p id="layoutTxt">Ubicacion del evento: </p>{eve.ubicacion_evento} </h3>
        </div>
    </a>
  </Link>
  )
}
