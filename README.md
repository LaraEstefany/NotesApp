# NotesApp

NotesApp is a modern note-taking application built with React, TypeScript and Vite, designed to provide a smooth, intuitive and productive user experience similar to popular note apps.

This project was developed as part of a frontend technical challenge, focusing on UX, code quality, business logic and delivery.

## Features

### Core Features

- Create, edit and manage notes
- Inline editing (title, content and tags)
- Rich text editor (bold, italic, underline, strikethrough)
- Checklists with interactive checkboxes
- Add emojis to notes
- Tag management (add, remove, filter)
- Search notes by text or tags
- Archive and unarchive notes
- Soft delete (trash) and permanent delete
- Local persistence using LocalStorage
- Responsive and accessible UI

### UX & UI

- Clean and modern layout
- Light and Dark mode
- Auto-save with debounce
- Click-to-edit interaction
- Scrollable editor
- Smart tag input

## Internationalization (i18n)

Multi-language support:

- English
- Portuguese (Brazil)
- Spanish
- French

Language switcher with flags.

## Tech Stack

- React 18
- TypeScript
- Vite
- Chakra UI (design system)
- Tiptap (rich text editor)
- ESLint (code quality)
- LocalStorage (data persistence)

## Getting Started

### Prerequisites

- Node.js >= 20.19
- npm or yarn

### Installation

```bash
git clone git@github.com:LaraEstefany/NotesApp.git
cd NotesApp
npm install
```

### Run the project

```bash
npm run dev
```

### Open your browser at:

```bash
http://localhost:5173
```

## Code Quality

- Strict TypeScript configuration
- ESLint with type-aware rules
- Modular and scalable architecture
- Clear separation of concerns

## Challenge Checklist

### Minimum Requirements

- Public repository
- React + TypeScript
- Fully functional application
- Pleasant and modern UI
- README with instructions

### Optional Requirements

- Code quality (ESLint)

## Design Decisions

- Inline editing was chosen to mimic real-world note apps and improve UX
- LocalStorage replaces a backend to keep the app fully client-side
- Debounced auto-save avoids excessive state updates
- Chakra UI with a custom theme ensures design consistency
- Tiptap enables advanced text features while keeping control over HTML output

## Possible Improvements

- Unit and integration tests
- Animations and transitions
- Drag and drop reordering
- Note sharing
- Export notes
- Backend integration

## Author

Developed by Lara Costa

Frontend Developer | React, TypeScript, UX-focused
