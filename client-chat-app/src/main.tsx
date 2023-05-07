import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "@GraphQL/index";
import { AuthUserProvider } from "@context/index";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { Toaster } from "react-hot-toast";
// import es from 'javascript-time-ago/locale/es-AR.json'

// TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(en);

createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={client}>
    <AuthUserProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </AuthUserProvider>
  </ApolloProvider>
);
