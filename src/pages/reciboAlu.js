import axios from "axios";
import { Layout } from "../../components/Layout";
import Link from 'next/link'
import { useRouter } from "next/router";
import { ReciboAluCard } from "../../components/reciboAluCard";
import withSession from "../../lib/session";

function FirstPage({user, recibo}) {
  //console.log(recibo)
  let recibosAlumnos = []
  let i = 0;
  while(i < recibo.length){
    if(recibo[i].KEY_cuenta_pago === user.KEY_cuenta_pago){
      recibosAlumnos.push(recibo[i])
    }
    i++
  }
  //console.log(recibosAlumnos)
  const router = useRouter()
  const renderRecibo = () => {


    if(recibosAlumnos.length === 0) return <h1 className="teext-center text-2xl font-bold">No hay nada en recibos todavia :(</h1>
    return recibosAlumnos.map((rec) => (
      <ReciboAluCard rec={rec} key={rec.PK_recibo} />
    ));
  }

  return (
    //toma productForm dede components para darle formato a la pagina inicial
    <Layout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {renderRecibo()}
      </div>

    </Layout>
  );
}

//funcion especial de next para ejecutar una logica antes ded que la pantalla sea devuelta al cliente
export  const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");

  const {data: recibo} = await axios.get(
    "https://deployed-lsoccer.vercel.app/api/recibo"
    );
  
  if (user === undefined) {
      res.setHeader("location", "/login");
      res.statusCode = 302;
      res.end();
      return { props: {} };
  }
  return {
    props: {
        recibo,
        user: req.session.get("user"),
    }, // will be passed to the page component as props
  }
});

export default FirstPage;