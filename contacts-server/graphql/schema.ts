import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLSchema, GraphQLID, GraphQLList } from 'graphql';
import { globalIdField, connectionDefinitions, connectionFromArray, connectionArgs, mutationWithClientMutationId, fromGlobalId, nodeDefinitions } from 'graphql-relay';
import { Contact } from '../controllers/contactController';

// Mock data that mirrors the REST API data
let contacts: Contact[] = [
  {
    id: '1',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp',
    jobTitle: 'Software Engineer',
    notes: 'Met at the React conference 2024. Interested in GraphQL.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e91d7f?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob.smith@designstudio.com',
    phone: '+1 (555) 987-6543',
    company: 'Design Studio',
    jobTitle: 'UX Designer',
    notes: 'Great designer, worked on mobile app redesign.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-20T14:15:00Z',
    updatedAt: '2024-01-20T14:15:00Z'
  },
  {
    id: '3',
    firstName: 'Carol',
    lastName: 'Davis',
    email: 'carol.davis@marketing-pro.com',
    phone: '+1 (555) 456-7890',
    company: 'Marketing Pro',
    jobTitle: 'Marketing Manager',
    notes: 'Handles B2B marketing campaigns. Very knowledgeable about lead generation.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-02-01T09:45:00Z',
    updatedAt: '2024-02-01T09:45:00Z'
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@freelance.com',
    phone: '+1 (555) 321-0987',
    company: 'Freelance',
    jobTitle: 'Full Stack Developer',
    notes: 'Specializes in Node.js and React. Available for consulting projects.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-02-10T16:20:00Z',
    updatedAt: '2024-02-10T16:20:00Z'
  },
  {
    id: '5',
    firstName: 'Emma',
    lastName: 'Brown',
    email: 'emma.brown@startup-inc.com',
    phone: '+1 (555) 654-3210',
    company: 'Startup Inc',
    jobTitle: 'Product Manager',
    notes: 'Working on AI-powered productivity tools. Always interested in new tech trends.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-02-15T11:30:00Z',
    updatedAt: '2024-02-15T11:30:00Z'
  }
];

// Node definitions for Relay
const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Contact') {
      return contacts.find(contact => contact.id === id);
    }
    return null;
  },
  (obj) => {
    if (obj && typeof obj === 'object' && 'firstName' in obj) {
      return 'Contact';
    }
    return undefined;
  }
);

// Contact GraphQL Type
const ContactType = new GraphQLObjectType({
  name: 'Contact',
  interfaces: [nodeInterface],
  fields: () => ({
    id: globalIdField('Contact'),
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    company: { type: GraphQLString },
    jobTitle: { type: GraphQLString },
    notes: { type: GraphQLString },
    avatar: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

// Contact Connection for Relay
const { connectionType: ContactConnection, edgeType: ContactEdge } = connectionDefinitions({
  name: 'Contact',
  nodeType: ContactType,
});

// Query Type
const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    contacts: {
      type: ContactConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(contacts, args),
    },
    contact: {
      type: ContactType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_, { id }) => {
        const { id: contactId } = fromGlobalId(id);
        return contacts.find(contact => contact.id === contactId);
      },
    },
  }),
});

// Create Contact Mutation
const createContactMutation = mutationWithClientMutationId({
  name: 'CreateContact',
  inputFields: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: GraphQLString },
    company: { type: GraphQLString },
    jobTitle: { type: GraphQLString },
    notes: { type: GraphQLString },
    avatar: { type: GraphQLString },
  },
  outputFields: {
    contact: {
      type: ContactType,
      resolve: (payload: any) => payload.contact,
    },
    contactEdge: {
      type: ContactEdge,
      resolve: (payload: any) => ({
        cursor: connectionFromArray(contacts, {}).edges.find(
          (edge: any) => edge.node.id === payload.contact.id
        )?.cursor || '',
        node: payload.contact,
      }),
    },
  },
  mutateAndGetPayload: (input: any) => {
    const now = new Date().toISOString();
    const newId = (Math.max(...contacts.map(c => parseInt(c.id))) + 1).toString();
    
    const newContact: Contact = {
      id: newId,
      firstName: input.firstName,
      lastName: input.lastName || '',
      email: input.email,
      phone: input.phone,
      company: input.company,
      jobTitle: input.jobTitle,
      notes: input.notes,
      avatar: input.avatar,
      createdAt: now,
      updatedAt: now,
    };
    
    contacts.push(newContact);
    return { contact: newContact };
  },
});

// Update Contact Mutation
const updateContactMutation = mutationWithClientMutationId({
  name: 'UpdateContact',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    company: { type: GraphQLString },
    jobTitle: { type: GraphQLString },
    notes: { type: GraphQLString },
    avatar: { type: GraphQLString },
  },
  outputFields: {
    contact: {
      type: ContactType,
      resolve: (payload: any) => payload.contact,
    },
  },
  mutateAndGetPayload: (input: any) => {
    const { id: contactId } = fromGlobalId(input.id);
    const contact = contacts.find(c => c.id === contactId);
    
    if (!contact) {
      throw new Error('Contact not found');
    }
    
    // Update fields that are provided
    if (input.firstName !== undefined) contact.firstName = input.firstName;
    if (input.lastName !== undefined) contact.lastName = input.lastName;
    if (input.email !== undefined) contact.email = input.email;
    if (input.phone !== undefined) contact.phone = input.phone;
    if (input.company !== undefined) contact.company = input.company;
    if (input.jobTitle !== undefined) contact.jobTitle = input.jobTitle;
    if (input.notes !== undefined) contact.notes = input.notes;
    if (input.avatar !== undefined) contact.avatar = input.avatar;
    
    contact.updatedAt = new Date().toISOString();
    
    return { contact };
  },
});

// Delete Contact Mutation
const deleteContactMutation = mutationWithClientMutationId({
  name: 'DeleteContact',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    deletedContactId: {
      type: GraphQLID,
      resolve: (payload: any) => payload.deletedContactId,
    },
  },
  mutateAndGetPayload: (input: any) => {
    const { id: contactId } = fromGlobalId(input.id);
    const index = contacts.findIndex(c => c.id === contactId);
    
    if (index === -1) {
      throw new Error('Contact not found');
    }
    
    contacts.splice(index, 1);
    return { deletedContactId: input.id };
  },
});

// Mutation Type
const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createContact: createContactMutation,
    updateContact: updateContactMutation,
    deleteContact: deleteContactMutation,
  }),
});

// Schema
export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});