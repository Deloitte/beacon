# Beacon Documentation

This directory contains the Docusaurus documentation site for Beacon.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The site will be available at `http://localhost:3000`.

### Building

To build the documentation site:

```bash
npm run build
```

The built site will be in the `build/` directory.

### Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `feature/docusaurus` branch via the GitHub Actions workflow.

## Structure

- `docs/` - Markdown documentation files
- `src/components/` - React components (e.g., SandboxIframe)
- `static/examples/` - Static assets (HTML example files and assets)
- `static/img/` - Images and other static assets

## Adding New Examples

1. Add your HTML file to `static/examples/` (preserving the directory structure)
2. Create a corresponding markdown file in `docs/docs/examples/`
3. Use the `SandboxIframe` component to embed the HTML file with the path `/examples/your-file.html`
4. Update `sidebars.js` to include the new example in navigation

