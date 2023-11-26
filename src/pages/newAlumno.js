import { Layout } from "../../components/Layout";
import { AlumnoForm } from "../../components/alumnoForm";


function NewAlumno() {
  return ( 
    <Layout>
      <div className="grid place-items-center h-5/6">
        <AlumnoForm />
      </div>
    </Layout>
    );
}

export default NewAlumno