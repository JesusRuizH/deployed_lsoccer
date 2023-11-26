import { Layout } from "../../components/Layout";
import { AdministracionForm } from "../../components/administracionForm";


function NewAdministracion() {
  return ( 
    <Layout>
      <div className="grid place-items-center h-5/6">
        <AdministracionForm />
      </div>
    </Layout>
    );
}

export default NewAdministracion