import "../styles/globals.css";
import UseProvider from "../context/user";
import Nav from "../components/nav";

function MyApp({ Component, pageProps }) {
  return (
    <UseProvider>
      <Nav />
      <Component {...pageProps} />
    </UseProvider>
  );
}

export default MyApp;
