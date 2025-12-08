# OKRION Website

A modern landing page for OKRION - A Smarter Way to Manage NAAC, NBA, and NIRF accreditation.

## Features

- Modern, responsive design based on Figma specifications
- React 18 with Vite for fast development
- Tailwind CSS for styling
- Smooth scrolling navigation
- Interactive demo form
- Fully responsive layout

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
okrionneww/
├── src/
│   ├── components/
│   │   └── LandingPage.jsx    # Main landing page component
│   ├── App.jsx                 # Root component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles with Tailwind
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── postcss.config.js           # PostCSS configuration
```

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

## Sections

The landing page includes:

1. **Header** - Navigation with logo and contact button
2. **Hero Section** - Main headline with CTA buttons and demo form
3. **Why Us** - Benefits grid
4. **Features** - Detailed feature cards
5. **Who Can Use** - User type grid
6. **How It Works** - Step-by-step process
7. **Footer** - Links, contact info, and support

## Customization

All styling is done with Tailwind CSS. You can customize colors, spacing, and other design tokens in `tailwind.config.js`.

## License

All rights reserved.

