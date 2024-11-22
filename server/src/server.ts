import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const server = express();

// Define a simple GraphQL schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Define a resolver
const root = {
  hello: () => "Hello, GraphQL!",
};

// Add the GraphQL route
server.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true, // Enable the GraphiQL UI for testing
  })
);

export default server;
