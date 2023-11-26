import Link from "next/link"

export function ReciboAluCard({rec}) {
  return (
    <Link legacyBehavior href={`/reciboAlu/${rec.PK_recibo}`} key={rec.PK_recibo}>
    <a>
        <div className="border border-gray-200 shadow-md p-6">
        
        <h3><p id="layoutTxt">Folio N º </p>{rec.PK_recibo}</h3>
        <h3><p id="layoutTxt">Numero de cuenta cliente: </p>{rec.KEY_cuenta_pago}</h3>
        <h3><p id="layoutTxt">Monto a pagar:  </p>{rec.monto_pagado} $MXN</h3>
        <img className="h-48 w-48" src={'http://localhost:3000/img/'+rec.imagen_pago}/>
        <h3><p id="layoutTxt">Fecha de realizacion de factura: </p>{rec.fecha_pago}</h3>
        <h3><p id="layoutTxt">observaciones: </p>{rec.observaciones}</h3>
        <h3><p id="layoutTxt">Validacion (0 / 1): </p>{rec.validacion}</h3>

        </div>
    </a>
  </Link>
  )
}
