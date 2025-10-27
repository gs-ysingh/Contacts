import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import contactRoutes from './routes/contactRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { schema } from './graphql/schema';

const app = express();

// Middleware for parsing JSON body
app.use(express.json());

// Enable CORS for frontend (adjust port if needed)
app.use(cors({ origin: 'http://localhost:3000' }));

// REST API Routes
app.use('/contacts', contactRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start the server with GraphQL
async function startServer() {
  // GraphQL Server
  const server = new ApolloServer({
    schema,
    introspection: true,
  });

  await server.start();
  server.applyMiddleware({ app: app as any, path: '/graphql' });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch(error => {
  console.error('Error starting server:', error);
});
