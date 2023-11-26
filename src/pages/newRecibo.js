import { Layout } from "../../components/Layout";
import { ReciboForm } from "../../components/reciboForm";


function NewRecibo() {
  return ( 
    <Layout>
      <div className="grid place-items-center h-5/6">
        <ReciboForm />
      </div>
    </Layout>
    );
}

export default NewRecibo