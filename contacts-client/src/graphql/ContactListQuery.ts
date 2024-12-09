import { graphql } from "react-relay";

export const ContactListQuery = graphql`
  query ContactListQuery {
    contacts {
      id
      name
    }
  }
`;
