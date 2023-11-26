import { Layout } from "../../components/Layout";
import { EquiposForm } from "../../components/equiposForm";


function NewEquipos() {
  return ( 
    <Layout>
      <div className="grid place-items-center h-5/6">
        <EquiposForm />
      </div>
    </Layout>
    );
}

export default NewEquipos