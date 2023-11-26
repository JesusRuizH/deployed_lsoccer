import Link from "next/link"

export function JugadoresCard({juga}) {
  return (
    <Link legacyBehavior href={`/jugadores/${juga.PK_jugadores}`} key={juga.PK_jugadores}>
    <a>
        <div className="border border-gray-200 shadow-md p-6">
        <h3><p id="layoutTxt">Identificador jugador: </p>{juga.PK_jugadores} </h3>
        <h3><p id="layoutTxt">Identificador de equipo: </p>{juga.FK_equipo}</h3>
        <h3><p id="layoutTxt">Nombre del jugador: </p>{juga.nombre_jugador} </h3>
        <h3><p id="layoutTxt">Posicion del jugador: </p>{juga.posicion_jugador}</h3>
        <h3><p id="layoutTxt">Jersey del jugador: </p>{juga.jersey} </h3>
        </div>
    </a>
  </Link>
  )
}
