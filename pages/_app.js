import "@/styles/globals.css";
import client from "@/utils/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
