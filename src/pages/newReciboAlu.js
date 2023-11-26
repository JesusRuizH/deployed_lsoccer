import { Layout } from "../../components/Layout";
import { ReciboAluForm } from "../../components/reciboAluForm";


function newReciboAlu() {
  return ( 
    <Layout>
      <div className="grid place-items-center h-5/6">
        <ReciboAluForm />
      </div>
    </Layout>
    );
}

export default newReciboAlu