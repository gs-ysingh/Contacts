import React from 'react';
import { Contact } from '../services/contactService';

interface ContactListItemProps {
  contact: Contact;
  isSelected: boolean;
  onClick: () => void;
}

const ContactListItem: React.FC<ContactListItemProps> = ({ contact, isSelected, onClick }) => {
  const fullName = `${contact.firstName} ${contact.lastName}`.trim();
  const displayName = fullName || contact.email;

  return (
    <div 
      className={`contact-list-item ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="contact-avatar">
        {contact.avatar ? (
          <img src={contact.avatar} alt={displayName} />
        ) : (
          <div className="avatar-placeholder">
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="contact-info">
        <div className="contact-name">{displayName}</div>
        <div className="contact-details">
          {contact.email && <div className="contact-email">{contact.email}</div>}
          {contact.company && <div className="contact-company">{contact.company}</div>}
        </div>
      </div>
    </div>
  );
};

export default ContactListItem;