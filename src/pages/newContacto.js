import { Layout } from "../../components/Layout";
import { ContactoForm } from "../../components/contactoForm";


function NewContacto() {
  return ( 
    <Layout>
      <div className="grid place-items-center h-5/6">
        <ContactoForm />
      </div>
    </Layout>
    );
}

export default NewContacto