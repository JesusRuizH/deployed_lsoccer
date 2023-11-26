import Link from "next/link"

export function ProfesorCard({prof}) {
  return (
    <Link legacyBehavior href={`/profesor/${prof.FK_usuario}`} key={prof.FK_usuario}>
    <a>
        <div className="border border-gray-200 shadow-md p-6">
        <h3><p id="layoutTxt">Clave del usuario Profesor: </p>{prof.FK_usuario}</h3>
        <h3><p id="layoutTxt">Tabla de categorias asignadas al profesor: </p>{prof.FK_cate_asignadas} </h3>
        </div>
    </a>
  </Link>
  )
}
