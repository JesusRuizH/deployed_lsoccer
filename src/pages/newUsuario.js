import { Layout } from "../../components/Layout";
import { UsuarioForm } from "../../components/usuarioForm";


function NewUsuario() {
  return ( 
    <Layout>
      <div className="grid place-items-center h-5/6">
        <UsuarioForm />
      </div>
    </Layout>
    );
}

export default NewUsuario