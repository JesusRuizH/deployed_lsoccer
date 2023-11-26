import { Layout } from "../../components/Layout";
import { Tabla_info_partidosForm } from "../../components/tabla_info_partidosForm";


function NewTabla_info_partidos() {
  return ( 
    <Layout>
      <div className="grid place-items-center h-5/6">
        <Tabla_info_partidosForm />
      </div>
    </Layout>
    );
}

export default NewTabla_info_partidos