import { Environment, Network, RecordSource, Store } from 'relay-runtime';

// Function to fetch GraphQL queries
function fetchQuery(operation: any, variables: any) {
  return fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => response.json());
}

// Create a network interface
const network = Network.create(fetchQuery);

// Create a new Relay Environment
const relayEnvironment = new Environment({
  network,
  store: new Store(new RecordSource()),
});

export default relayEnvironment;