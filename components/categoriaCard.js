import Link from "next/link"

export function CategoriaCard({cate}) {
  return (
    <Link legacyBehavior href={`/categoria/${cate.pk_categoria}`} key={cate.pk_categoria}>
    <a>
        <div className="border border-gray-200 shadow-md p-6">
        <h3><p id="layoutTxt">Registro de categoria: </p>{cate.pk_categoria}</h3>
        <h3><p id="layoutTxt">Fecha de inicio de la categoria: </p>{cate.fecha_categoria_ini}</h3>
        <h3><p id="layoutTxt">Fecha de termino de la categoria: </p>{cate.fecha_categoria_fin}</h3>
        <h3><p id="layoutTxt">Turno de la categoria (M/V): </p>{cate.turno}</h3>
        </div>
    </a>
  </Link>
  )
}
