import { Layout } from "../../components/Layout";
import { Cate_asignadasForm } from "../../components/cate_asignadasForm";


function NewCate_asignadas() {
  return ( 
    <Layout>
      <div className="grid place-items-center h-5/6">
        <Cate_asignadasForm />
      </div>
    </Layout>
    );
}

export default NewCate_asignadas