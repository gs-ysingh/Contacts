import React from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { ContactListQuery } from './graphql/__generated__/ContactListQuery.graphql';
import { ContactListQuery as ContactListQueryDocument } from './graphql/ContactListQuery';

const App: React.FC = () => {
  const data = useLazyLoadQuery<ContactListQuery>(ContactListQueryDocument, {});
    
  return (
    <div>
      <h1>Contacts</h1>
      <ul>
        {(data?.contacts ?? []).map((contact) => (
          contact && (
            <li key={contact.id}>
              {contact.name ?? 'No Name'} - {contact.phone ?? 'No Phone'}
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default App;
