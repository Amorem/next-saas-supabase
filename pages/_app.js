import "../styles/globals.css";
import UseProvider from "../context/user";

function MyApp({ Component, pageProps }) {
  return (
    <UseProvider>
      <Component {...pageProps} />
    </UseProvider>
  );
}

export default MyApp;
