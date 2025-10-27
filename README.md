# Movie App

A **sleek and responsive movie browsing application** built with **React + Vite**.  
Search, explore, and discover movies using a modern UI with real-time data from the TMDb API.

---

## Live Demo

[Movie App on Vercel](https://your-vercel-url.vercel.app)  
_(will replace with link)_

---

## Features

- Browse trending and popular movies
- Search for movies by title
- View detailed movie information
- Modular and reusable React components
- Built with **Vite** for fast performance
- Clean and responsive design

---

## Tech Stack

| Category             | Technologies          |
| -------------------- | --------------------- |
| **Frontend**         | React, Vite           |
| **State Management** | React Context / Hooks |
| **Styling**          | CSS                   |
| **API**              | TMDb API              |
| **Build Tool**       | Vite                  |
| **Version Control**  | Git + GitHub          |

---

## Installation & Setup

Clone the repo:

```bash
git clone https://github.com/Ryan-Shino/movie-app.git
cd movie-app
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Environment Variables

This project uses the TMDb API key.
Create a .env file in the root:

VITE_API_KEY=your_tmdb_api_key_here

The .env file is gitignored for security.
Access the key in your code:

const API_KEY = import.meta.env.VITE_API_KEY;

## Project Structure:

```lua
Movie App/
├── public/
├── src/
│ ├── components/
│ ├── contexts/
│ ├── css/
│ ├── pages/
│ ├── services/
│ ├── App.jsx
│ └── main.jsx
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Author

Ryan Shino
GitHub: Ryan-Shino
LinkedIn: [Your LinkedIn URL] (optional)

## License

This project is licensed under the MIT License.

## Deployment & CI/CD

This project is deployed using Vercel with GitHub integration:
Every push to the main branch triggers an automatic build and deployment
API keys are securely managed via environment variables
I wanted to familiarity with industry-standard continuous deployment workflows
