import Link from "next/link"

export function EntrenamientosCard({entr}) {
  return (
    <Link legacyBehavior href={`/entrenamientos/${entr.PK_entrenamientos}`} key={entr.PK_entrenamientos}>
    <a>
        <div className="border border-gray-200 shadow-md p-6">
        <h3><p id="layoutTxt">Folio de categoria: </p>{entr.FK_categoria}</h3>
        <h3><p id="layoutTxt">Dias de entrenamiento: </p>{entr.dias_entrenamiento}</h3>
        <h3><p id="layoutTxt">Horario de inicio del entrenamiento: </p>{entr.horarios_entrena_ini}</h3>
        <h3><p id="layoutTxt">Horario de fin del entrenamiento: </p>{entr.horarios_entrena_fin}</h3>
        
        </div>
    </a>
  </Link>
  )
}
