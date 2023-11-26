import { Layout } from "../../components/Layout";
import { Tipo_cuentaForm } from "../../components/tipo_cuentaForm";


function NewTipo_cuenta() {
  return ( 
    <Layout>
      <div className="grid place-items-center h-5/6">
        <Tipo_cuentaForm />
      </div>
    </Layout>
    );
}

export default NewTipo_cuenta