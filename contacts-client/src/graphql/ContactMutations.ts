import { graphql } from 'react-relay';

export const CreateContactMutation = graphql`
  mutation ContactMutationsCreateContactMutation($input: CreateContactInput!, $connections: [ID!]!) {
    createContact(input: $input) {
      contactEdge @appendEdge(connections: $connections) {
        cursor
        node {
          id
          firstName
          lastName
          email
          phone
          company
          jobTitle
          notes
          avatar
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const UpdateContactMutation = graphql`
  mutation ContactMutationsUpdateContactMutation($input: UpdateContactInput!) {
    updateContact(input: $input) {
      contact {
        id
        firstName
        lastName
        email
        phone
        company
        jobTitle
        notes
        avatar
        createdAt
        updatedAt
      }
    }
  }
`;

export const DeleteContactMutation = graphql`
  mutation ContactMutationsDeleteContactMutation($input: DeleteContactInput!, $connections: [ID!]!) {
    deleteContact(input: $input) {
      deletedContactId @deleteEdge(connections: $connections)
    }
  }
`;
