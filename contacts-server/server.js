const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const app = express();

// Allow requests from localhost:8080
app.use(cors({ origin: 'http://localhost:8080' }));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Server running at http://localhost:4000/graphql');
});
