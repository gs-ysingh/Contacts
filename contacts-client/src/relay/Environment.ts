import {
    Environment,
    Network,
    RecordSource,
    Store,
  } from 'relay-runtime';
  
  const fetchGraphQL = async (operation: any, variables: any) => {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    });
    return await response.json();
  };
  
  const environment = new Environment({
    network: Network.create(fetchGraphQL),
    store: new Store(new RecordSource()),
  });
  
  export default environment;
  