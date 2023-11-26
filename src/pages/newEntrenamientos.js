import { Layout } from "../../components/Layout";
import { EntrenamientosForm } from "../../components/entrenamientosForm";


function NewEntrenamientos() {
  return ( 
    <Layout>
      <div className="grid place-items-center h-5/6">
        <EntrenamientosForm />
      </div>
    </Layout>
    );
}

export default NewEntrenamientos