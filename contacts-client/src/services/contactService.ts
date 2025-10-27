// Contact type definition
export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  notes?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

const BASE_URL = 'http://localhost:4000/contacts';

// API service for contacts
export const contactService = {
  // Get all contacts
  async getAllContacts(): Promise<Contact[]> {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return response.json();
  },

  // Get contact by ID
  async getContactById(id: string): Promise<Contact> {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch contact');
    }
    return response.json();
  },

  // Create new contact
  async createContact(contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact> {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    if (!response.ok) {
      throw new Error('Failed to create contact');
    }
    return response.json();
  },

  // Update contact
  async updateContact(id: string, contact: Partial<Contact>): Promise<Contact> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    if (!response.ok) {
      throw new Error('Failed to update contact');
    }
    return response.json();
  },

  // Delete contact
  async deleteContact(id: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }
  },
};