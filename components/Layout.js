import { ToastContainer } from "react-toastify";
import { Navbar } from "./Navbar";

export function Layout({children}) {
    return( 
    <>

    <div className="h-screeen p-10">
        <div className="container mx-auto h-full">{children}</div>
    </div>

    <ToastContainer />
    </>
    );
}

