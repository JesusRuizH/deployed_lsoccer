import { Layout } from "../../components/Layout";
import { CategoriaForm } from "../../components/categoriaForm";


function NewCategoria() {
  return ( 
    <Layout>
      <div className="grid place-items-center h-5/6">
        <CategoriaForm />
      </div>
    </Layout>
    );
}

export default NewCategoria