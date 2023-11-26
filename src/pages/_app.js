//import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'
import { SWRConfig } from "swr";
import fetch from "../../lib/fetchJson";


export default function App({ Component, pageProps }) {
  return <SWRConfig
    value={{
      fetcher: fetch,
      onError: (err) => {
        console.error(err);
      },
    }}
  >
    <Component {...pageProps} />
  </SWRConfig>;
  
}

//console.log("holacola")