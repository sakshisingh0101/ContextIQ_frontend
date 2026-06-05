# ContextIQ Frontend

AI-powered document intelligence platform frontend built with React, Redux Toolkit, Tailwind CSS, and React Router.

Users can upload documents, view AI-generated summaries, ask follow-up questions, and interact with extracted knowledge through a clean dashboard interface.

## Live Demo

🚀 https://context-iq-frontend.vercel.app

## Features

- User Authentication
  - Signup
  - Email Verification (OTP)
  - Login / Logout
  - Protected Routes

- Document Management
  - Upload PDF or Text Documents
  - Document Processing
  - AI Summary Display

- AI Chat Interface
  - Ask Questions About Uploaded Documents
  - Context-Aware Responses

- Dashboard
  - View Uploaded Documents
  - Manage Processing Results
  - User Settings

## Tech Stack

### Frontend

- React
- Vite
- Redux Toolkit
- React Router DOM
- Tailwind CSS

### Backend

- Node.js
- Express.js
- PostgreSQL
- Redis
- LangChain
- OpenRouter
- Hugging Face Embeddings

## Project Structure

```bash
src/
├── components/
├── pages/
├── redux/
├── services/
├── App.jsx
├── main.jsx
└── index.css
```

## Installation

Clone the repository:

```bash
git clone https://github.com/sakshisingh0101/ContextIQ_frontend.git
```

Move into project folder:

```bash
cd ContextIQ_frontend
```

Install dependencies:

```bash
npm install
```

Create environment file:

```env
VITE_API_URL=https://contextiq-backend-zcck.onrender.com
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://contextiq-backend-zcck.onrender.com
```

## Backend Repository

🔗 https://github.com/sakshisingh0101/ContextIQ_backend

## Screens

- Landing Page
- Signup Page
- OTP Verification Page
- Login Page
- Dashboard
- Upload Document Page
- Results Page
- Chat Interface
- Settings Page

## Future Improvements

- Vector Search
- RAG Pipeline
- Chat History
- Multi-document Conversations
- Document Collections
- Streaming Responses
- Export Summaries

## Author

Sakshi Singh

DTU | Software Engineering | Full Stack Development | AI Applications

---

Built with React, LangChain, OpenRouter, PostgreSQL, Redis, and Hugging Face.
