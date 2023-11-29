import Link from "next/link"

export function DirectorCard({dire}) {
  return (
    <Link legacyBehavior href={`/director/${dire.fk_usuario}`} key={dire.fk_usuario}>
    <a>
        <div className="border border-gray-200 shadow-md p-6">
        <h3><p id="layoutTxt">Folio Director: </p>{dire.fk_usuario}</h3>
        <h3><p id="layoutTxt">NSS Director: </p>{dire.nss}</h3>

        </div>
    </a>
  </Link>
  )
}
