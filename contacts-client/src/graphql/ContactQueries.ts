import { graphql } from 'react-relay';

export const ContactListQuery = graphql`
  query ContactQueriesContactListQuery($first: Int, $after: String) {
    contacts(first: $first, after: $after) {
      edges {
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
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const ContactDetailQuery = graphql`
  query ContactQueriesContactDetailQuery($id: ID!) {
    contact(id: $id) {
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
`;