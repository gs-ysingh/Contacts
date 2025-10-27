import React, { Suspense, useState } from 'react';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { ContactListQuery } from './graphql/ContactQueries';
import { CreateContactMutation, UpdateContactMutation, DeleteContactMutation } from './graphql/ContactMutations';
import ContactListItem from './components/ContactListItem';
import ContactDetail from './components/ContactDetail';
import ContactForm from './components/ContactForm';
import './styles.css';

import type { ContactQueriesContactListQuery } from './graphql/__generated__/ContactQueriesContactListQuery.graphql';
import type { ContactMutationsCreateContactMutation } from './graphql/__generated__/ContactMutationsCreateContactMutation.graphql';
import type { ContactMutationsUpdateContactMutation } from './graphql/__generated__/ContactMutationsUpdateContactMutation.graphql';
import type { ContactMutationsDeleteContactMutation } from './graphql/__generated__/ContactMutationsDeleteContactMutation.graphql';

const AppContent: React.FC = () => {
  const data = useLazyLoadQuery<ContactQueriesContactListQuery>(ContactListQuery, { first: 100 });
  
  const contacts = data.contacts?.edges?.map(edge => edge?.node).filter(Boolean) || [];
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<any>(null);

  const [createContact] = useMutation<ContactMutationsCreateContactMutation>(CreateContactMutation);
  const [updateContact] = useMutation<ContactMutationsUpdateContactMutation>(UpdateContactMutation);
  const [deleteContact] = useMutation<ContactMutationsDeleteContactMutation>(DeleteContactMutation);

  const selectedContact = contacts.find(c => c?.id === selectedContactId);

  const handleNewContact = () => {
    setEditingContact(null);
    setIsFormOpen(true);
  };

  const handleEdit = () => {
    if (selectedContact) {
      setEditingContact(selectedContact);
      setIsFormOpen(true);
    }
  };

  const handleSave = (formData: any) => {
    if (editingContact) {
      // Update existing contact
      updateContact({
        variables: {
          input: {
            id: editingContact.id,
            ...formData,
          },
        },
        onCompleted: () => {
          setIsFormOpen(false);
          setEditingContact(null);
          console.log('Contact updated successfully');
        },
        onError: (error) => {
          console.error('Error updating contact:', error);
          alert('Failed to update contact: ' + error.message);
        },
      });
    } else {
      // Create new contact
      createContact({
        variables: {
          input: formData,
        },
        updater: (store) => {
          // Get the new contact from the mutation response
          const payload = store.getRootField('createContact');
          const newContact = payload?.getLinkedRecord('contact');
          
          if (newContact) {
            // Get the root query
            const rootField = store.getRoot();
            const connection = rootField.getLinkedRecord('contacts', { first: 100 });
            
            if (connection) {
              // Create a new edge for the contact
              const newEdge = store.create(`client:newEdge:${newContact.getValue('id')}`, 'ContactEdge');
              newEdge.setLinkedRecord(newContact, 'node');
              
              // Add the new edge to the connection
              const edges = connection.getLinkedRecords('edges') || [];
              connection.setLinkedRecords([newEdge, ...edges], 'edges');
            }
          }
        },
        onCompleted: (response) => {
          setIsFormOpen(false);
          if (response.createContact?.contact?.id) {
            setSelectedContactId(response.createContact.contact.id);
          }
          console.log('Contact created successfully');
        },
        onError: (error) => {
          console.error('Error creating contact:', error);
          alert('Failed to create contact: ' + error.message);
        },
      });
    }
  };

  const handleDelete = () => {
    if (!selectedContact) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedContact.firstName} ${selectedContact.lastName}?`)) {
      const contactId = selectedContact.id;
      
      deleteContact({
        variables: {
          input: {
            id: contactId,
          },
        },
        updater: (store) => {
          // Remove the contact from the connection
          const rootField = store.getRoot();
          const connection = rootField.getLinkedRecord('contacts', { first: 100 });
          
          if (connection) {
            const edges = connection.getLinkedRecords('edges');
            if (edges) {
              const newEdges = edges.filter(edge => {
                const node = edge?.getLinkedRecord('node');
                return node?.getValue('id') !== contactId;
              });
              connection.setLinkedRecords(newEdges, 'edges');
            }
          }
          
          // Delete the record from the store
          store.delete(contactId);
        },
        onCompleted: () => {
          setSelectedContactId(null);
          console.log('Contact deleted successfully');
        },
        onError: (error) => {
          console.error('Error deleting contact:', error);
          alert('Failed to delete contact: ' + error.message);
        },
      });
    }
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingContact(null);
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>Contacts (Relay)</h1>
        <button onClick={handleNewContact} className="btn-primary">
          + New Contact
        </button>
      </div>
      <div className="app-content">
        <div className="sidebar">
          <div className="contact-list">
            {contacts.length === 0 ? (
              <div className="no-contacts">No contacts yet</div>
            ) : (
              contacts.map((contact) => (
                contact && (
                  <ContactListItem
                    key={contact.id}
                    contact={contact as any}
                    isSelected={contact.id === selectedContactId}
                    onClick={() => setSelectedContactId(contact.id)}
                  />
                )
              ))
            )}
          </div>
        </div>
        <div className="main-content">
          {selectedContact ? (
            <ContactDetail
              contact={selectedContact as any}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <div className="no-selection">
              <h2>Select a contact</h2>
              <p>Choose a contact from the list to view details</p>
            </div>
          )}
        </div>
      </div>

      {isFormOpen && (
        <ContactForm
          contact={editingContact}
          onSave={handleSave}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Suspense fallback={<div className="loading">Loading contacts...</div>}>
      <AppContent />
    </Suspense>
  );
};

export default App;
