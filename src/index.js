import '@babel/polyfill/noConflict';
import 'dotenv/config';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';

import resolvers from './resolvers';
import typeDefs from './typeDefs';
import models, { sequelize } from './models';
import { createUsersWithMessages } from './seed';

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => ({
    me: await models.User.findByLogin('rwieruch'),
    models
  })
});

server.applyMiddleware({ app, path: '/graphql' });

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    await createUsersWithMessages();
  }

  app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
  });
});
