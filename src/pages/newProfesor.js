import { Layout } from "../../components/Layout";
import { ProfesorForm } from "../../components/profesorForm";


function NewProfesor() {
  return ( 
    <Layout>
      <div className="grid place-items-center h-5/6">
        <ProfesorForm />
      </div>
    </Layout>
    );
}

export default NewProfesor