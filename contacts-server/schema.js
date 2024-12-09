const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
  } = require('graphql');
  const {
    mutationWithClientMutationId,
    nodeDefinitions,
    fromGlobalId,
  } = require('graphql-relay');
  
  let contacts = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' },
  ];
  
  const { nodeInterface, nodeField } = nodeDefinitions(
    (globalId) => {
      const { type, id } = fromGlobalId(globalId);
      if (type === 'Contact') {
        return contacts.find((contact) => contact.id === id);
      }
      return null;
    },
    (obj) => {
      if (obj.email) return contactType;
      return null;
    }
  );
  
  const contactType = new GraphQLObjectType({
    name: 'Contact',
    fields: {
      id: { type: new GraphQLNonNull(GraphQLID) }, // Ensure `id` is non-nullable
      name: { type: GraphQLString },
      email: { type: GraphQLString },
    },
    interfaces: [nodeInterface],
  });
  
  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
      node: nodeField,
      contacts: {
        type: new GraphQLList(contactType),
        resolve: () => contacts,
      },
    },
  });
  
  const addContactMutation = mutationWithClientMutationId({
    name: 'AddContact',
    inputFields: {
      name: { type: GraphQLString },
      email: { type: GraphQLString },
    },
    outputFields: {
      contact: { type: contactType },
    },
    mutateAndGetPayload: ({ name, email }) => {
      const newContact = { id: `${contacts.length + 1}`, name, email };
      contacts.push(newContact);
      return { contact: newContact };
    },
  });
  
  const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addContact: addContactMutation,
    },
  });
  
  module.exports = new GraphQLSchema({
    query: queryType,
    mutation: mutationType,
  });
  