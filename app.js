const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require("./schema");

const app = express();

app.use('/api', graphqlHTTP({
  schema: schema.typeDefs,
  rootValue: schema.root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));