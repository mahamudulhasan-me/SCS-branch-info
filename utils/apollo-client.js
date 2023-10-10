import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api-party-dashboard.sundarban.delivery/graphql",
  cache: new InMemoryCache(),
});

export default client;
