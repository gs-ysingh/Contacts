# Contacts Application

A full-stack contacts management application built with React, Relay, GraphQL, TypeScript, and Express.

## 🚀 Features

- **GraphQL API** with Relay-compliant schema
- **React 18** with Relay for efficient data fetching
- **TypeScript** for type safety across the stack
- **Real-time UI** with optimistic updates
- **CRUD Operations** for contact management
- **RESTful API** alongside GraphQL endpoints
- **Webpack Dev Server** with hot module replacement

## 📁 Project Structure

```
Contacts/
├── contacts-client/          # React + Relay frontend
│   ├── src/
│   │   ├── App.tsx          # Main application component
│   │   ├── index.tsx        # Entry point
│   │   ├── styles.css       # Global styles
│   │   ├── components/      # React components
│   │   │   ├── ContactDetail.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   └── ContactListItem.tsx
│   │   ├── graphql/         # GraphQL queries and mutations
│   │   │   ├── ContactQueries.ts
│   │   │   ├── ContactMutations.ts
│   │   │   └── __generated__/    # Relay compiled artifacts
│   │   ├── relay/           # Relay environment setup
│   │   │   └── Environment.ts
│   │   └── services/        # Service layer
│   │       └── contactService.ts
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── relay.config.json    # Relay compiler configuration
│   ├── schema.graphql       # GraphQL schema (downloaded from server)
│   ├── tsconfig.json
│   └── webpack.config.js
│
└── contacts-server/          # Express + GraphQL backend
    ├── server.ts            # Main server file
    ├── controllers/         # Business logic
    │   └── contactController.ts
    ├── graphql/             # GraphQL schema definition
    │   └── schema.ts
    ├── middlewares/         # Express middlewares
    │   └── errorHandler.ts
    ├── routes/              # REST API routes
    │   └── contactRoutes.ts
    ├── package.json
    ├── schema.graphql       # GraphQL schema
    └── tsconfig.json
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Relay 20** - GraphQL client with normalized cache
- **TypeScript 5** - Type safety
- **Webpack 5** - Module bundler
- **CSS** - Styling

### Backend
- **Express.js** - Web framework
- **Apollo Server 3** - GraphQL server
- **GraphQL** - Query language
- **graphql-relay** - Relay specification utilities
- **TypeScript 5** - Type safety
- **ts-node** - TypeScript execution

## 📋 Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn
- nvm (optional, for Node version management)

## 🚀 Getting Started

### 1. Install Dependencies

#### Backend
```bash
cd contacts-server
npm install
```

#### Frontend
```bash
cd contacts-client
npm install
```

### 2. Start the Backend Server

```bash
cd contacts-server
npm start
```

The server will start at:
- REST API: `http://localhost:4000`
- GraphQL endpoint: `http://localhost:4000/graphql`

### 3. Download GraphQL Schema (if needed)

If the schema needs to be updated:

```bash
cd contacts-client
npm run schema
```

### 4. Compile Relay Queries

Generate TypeScript types from GraphQL operations:

```bash
cd contacts-client
npm run relay
```

### 5. Start the Frontend

```bash
cd contacts-client
npm start
```

The client will start at `http://localhost:3000`

## 📝 Available Scripts

### Backend (contacts-server)
- `npm start` - Start the Express + GraphQL server with ts-node

### Frontend (contacts-client)
- `npm start` - Start webpack dev server
- `npm run build` - Build for production
- `npm run relay` - Compile Relay queries and mutations
- `npm run schema` - Download GraphQL schema from server

## 🔧 Development Workflow

1. **Start the backend server** first to ensure the GraphQL endpoint is available
2. **Download/update the schema** if the backend schema changes
3. **Write GraphQL queries/mutations** in the client
4. **Run Relay compiler** to generate TypeScript types
5. **Start the frontend** development server

## 🌐 API Endpoints

### GraphQL
- **Endpoint:** `http://localhost:4000/graphql`
- **Operations:**
  - Queries: `contacts` (with pagination support)
  - Mutations: `createContact`, `updateContact`, `deleteContact`

### REST API
- **Base URL:** `http://localhost:4000/contacts`
- Available as alternative to GraphQL

## 🎨 Features Implemented

- ✅ Contact list with Relay pagination
- ✅ Create new contacts
- ✅ Update existing contacts
- ✅ Delete contacts
- ✅ Optimistic UI updates with Relay
- ✅ Connection-based mutations (@appendEdge, @deleteEdge)
- ✅ TypeScript type safety throughout
- ✅ GraphQL schema introspection
- ✅ Error handling

## 🔑 Key Concepts

### Relay Modern
This project uses Relay Modern with:
- **Fragment Colocation** - Components declare their data requirements
- **Automatic Batching** - Efficient query batching
- **Normalized Cache** - Automatic cache updates
- **Optimistic Updates** - Instant UI feedback
- **Connection Protocol** - Cursor-based pagination

### GraphQL Schema
The schema follows Relay specifications with:
- Node interface for global object identification
- Connection pattern for pagination
- Input types for mutations
- Edge and Node types for list queries

## 📚 Learn More

- [React Relay Documentation](https://relay.dev/)
- [GraphQL Documentation](https://graphql.org/)
- [Apollo Server Documentation](https://www.apollographql.com/docs/apollo-server/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## 📄 License

ISC

## 👤 Author

Yogesh Singh