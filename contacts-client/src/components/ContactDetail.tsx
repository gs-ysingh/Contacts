import React from 'react';
import { Contact } from '../services/contactService';

interface ContactDetailProps {
  contact: Contact;
  onEdit: () => void;
  onDelete: () => void;
}

const ContactDetail: React.FC<ContactDetailProps> = ({ contact, onEdit, onDelete }) => {
  const fullName = `${contact.firstName} ${contact.lastName}`.trim();
  const displayName = fullName || contact.email;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="contact-detail">
      <div className="contact-detail-header">
        <div className="contact-avatar-large">
          {contact.avatar ? (
            <img src={contact.avatar} alt={displayName} />
          ) : (
            <div className="avatar-placeholder-large">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="contact-header-info">
          <h1>{displayName}</h1>
          {contact.jobTitle && contact.company && (
            <p className="contact-position">{contact.jobTitle} at {contact.company}</p>
          )}
        </div>
        <div className="contact-actions">
          <button onClick={onEdit} className="btn-primary">Edit</button>
          <button onClick={onDelete} className="btn-danger">Delete</button>
        </div>
      </div>

      <div className="contact-detail-content">
        <div className="contact-section">
          <h3>Contact Information</h3>
          <div className="contact-field">
            <label>Email:</label>
            <span>{contact.email}</span>
          </div>
          {contact.phone && (
            <div className="contact-field">
              <label>Phone:</label>
              <span>{contact.phone}</span>
            </div>
          )}
        </div>

        {(contact.company || contact.jobTitle) && (
          <div className="contact-section">
            <h3>Work Information</h3>
            {contact.company && (
              <div className="contact-field">
                <label>Company:</label>
                <span>{contact.company}</span>
              </div>
            )}
            {contact.jobTitle && (
              <div className="contact-field">
                <label>Job Title:</label>
                <span>{contact.jobTitle}</span>
              </div>
            )}
          </div>
        )}

        {contact.notes && (
          <div className="contact-section">
            <h3>Notes</h3>
            <div className="contact-notes">
              {contact.notes}
            </div>
          </div>
        )}

        <div className="contact-section">
          <h3>Timeline</h3>
          <div className="contact-field">
            <label>Created:</label>
            <span>{formatDate(contact.createdAt)}</span>
          </div>
          <div className="contact-field">
            <label>Last Updated:</label>
            <span>{formatDate(contact.updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;