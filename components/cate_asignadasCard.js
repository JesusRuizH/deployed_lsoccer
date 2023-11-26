import Link from "next/link"

export function Cate_asignadasCard({c_asig}) {
  return (
    <Link legacyBehavior href={`/cate_asignadas/${c_asig.PK_cate_asignadas}`} key={c_asig.PK_cate_asignadas}>
    <a>
        <div className="border border-gray-200 shadow-md p-6">
        <h3><p id="layoutTxt">Categoria asignada 1: </p>{c_asig.cate_uno}</h3>
        <h3><p id="layoutTxt">Categoria asignada 2: </p>{c_asig.cate_dos}</h3>
        <h3><p id="layoutTxt">Categoria asignada 3: </p>{c_asig.cate_tres}</h3>
        </div>
    </a>
  </Link>
  )
}
