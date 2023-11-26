import { Layout } from "../../components/Layout";
import { DirectorForm } from "../../components/directorForm";


function NewDirector() {
  return ( 
    <Layout>
      <div className="grid place-items-center h-5/6">
        <DirectorForm />
      </div>
    </Layout>
    );
}

export default NewDirector