import { Layout } from "../../components/Layout";
import { JugadoresForm } from "../../components/jugadoresForm";


function NewJugadores() {
  return ( 
    <Layout>
      <div className="grid place-items-center h-5/6">
        <JugadoresForm />
      </div>
    </Layout>
    );
}

export default NewJugadores