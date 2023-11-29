import {Navegador} from "../../components/navegador";
import withSession from "../../lib/session";

export default function Home({user}) {
    return (
        <>
        <Navegador user={user}/>
        <p className="ml-8 mt-8 mb-2 text-gray-500">Crear Ligas</p>
        <iframe className="w-full aspect-[5/2] " src="https://deployed-lsoccer.vercel.app/liga"></iframe>
        </>
    )
    
}

export const getServerSideProps = withSession(async function ({ req, res }) {
    const user = req.session.get("user");
    if (user === undefined) {
      res.setHeader("location", "/login");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }
    return {
      props: { 
               user: req.session.get("user"),     
        },
               
    };
  });