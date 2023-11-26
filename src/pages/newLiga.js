import { Layout } from "../../components/Layout";
import { LigaForm } from "../../components/ligaForm";


function NewLiga() {
  return ( 
    <Layout>
      <div className="grid place-items-center h-5/6">
        <LigaForm />
      </div>
    </Layout>
    );
}

export default NewLiga