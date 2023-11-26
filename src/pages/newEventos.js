import { Layout } from "../../components/Layout";
import { EventosForm } from "../../components/eventosForm";


function NewEventos() {
  return ( 
    <Layout>
      <div className="grid place-items-center h-5/6">
        <EventosForm />
      </div>
    </Layout>
    );
}

export default NewEventos