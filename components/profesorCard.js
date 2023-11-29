import Link from "next/link"

export function ProfesorCard({prof}) {
  return (
    <Link legacyBehavior href={`/profesor/${prof.fk_usuario}`} key={prof.fk_usuario}>
    <a>
        <div className="border border-gray-200 shadow-md p-6">
        <h3><p id="layoutTxt">Clave del usuario Profesor: </p>{prof.fk_usuario}</h3>
        <h3><p id="layoutTxt">Tabla de categorias asignadas al profesor: </p>{prof.fk_cate_asignadas} </h3>
        </div>
    </a>
  </Link>
  )
}
