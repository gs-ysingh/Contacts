import { Request, Response } from 'express';

// Define the Contact type
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

// Sample in-memory contacts data with richer information
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

// Get all contacts
export const getAllContacts = (req: Request, res: Response): void => {
  res.json(contacts);
};

// Get contact by ID
export const getContactById = (req: Request, res: Response): void => {
  const contact = contacts.find(c => c.id === req.params.id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
};

// Create a new contact
export const createContact = (req: Request, res: Response): void => {
  const { firstName, lastName, email, phone, company, jobTitle, notes } = req.body;
  const now = new Date().toISOString();
  const newId = (Math.max(...contacts.map(c => parseInt(c.id))) + 1).toString();
  
  const newContact: Contact = {
    id: newId,
    firstName: firstName || '',
    lastName: lastName || '',
    email: email || '',
    phone,
    company,
    jobTitle,
    notes,
    createdAt: now,
    updatedAt: now
  };
  
  contacts.push(newContact);
  res.status(201).json(newContact);
};

// Update contact by ID
export const updateContact = (req: Request, res: Response): void => {
  const contact = contacts.find(c => c.id === req.params.id);
  if (contact) {
    const { firstName, lastName, email, phone, company, jobTitle, notes } = req.body;
    
    if (firstName !== undefined) contact.firstName = firstName;
    if (lastName !== undefined) contact.lastName = lastName;
    if (email !== undefined) contact.email = email;
    if (phone !== undefined) contact.phone = phone;
    if (company !== undefined) contact.company = company;
    if (jobTitle !== undefined) contact.jobTitle = jobTitle;
    if (notes !== undefined) contact.notes = notes;
    
    contact.updatedAt = new Date().toISOString();
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
};

// Delete contact by ID
export const deleteContact = (req: Request, res: Response): void => {
  const index = contacts.findIndex(c => c.id === req.params.id);
  if (index !== -1) {
    contacts.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
};
