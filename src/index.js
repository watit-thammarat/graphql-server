import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';

import resolvers from './resolvers';
import data from './data';
import typeDefs from './typeDefs';

const me = data.users[1];

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => ({ me, data })
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
