# Nanobanana - OpenRouter-Based Image Generation Web UI

This is a modern web application built with Vue 3, TypeScript, and TailwindCSS that calls the OpenRouter API directly for image generation and multimodal conversations.

## Core Features

### ✨ Web UI Capabilities

-   **Multiple Image Uploads**: Drag and drop or click to upload multiple local images with real-time thumbnail previews
-   **Intelligent Conversations**: Enter text prompts and chat with the AI using your uploaded images in a multimodal workflow
-   **Direct Integration**: The frontend calls the OpenRouter API directly—no intermediary server required
-   **Modern Interface**: Responsive dark-theme UI powered by TailwindCSS
-   **Real-Time Feedback**: Loading states, error handling, and result display
-   **Type Safety**: Full TypeScript support throughout the project

## Why Use This Project?

-   **Pure Frontend App**: No backend deployment needed—just host the static files
-   **Modern Tech Stack**: Vue 3 + TypeScript + TailwindCSS for a great development experience
-   **Direct API Calls**: Connect straight to the OpenRouter API to reduce extra layers
-   **Easy Deployment**: Deploy to any static hosting service (Vercel, Netlify, GitHub Pages, etc.)

## Tech Stack

-   **Frontend**: Vue 3 + TypeScript + TailwindCSS + Vite
-   **Build Tool**: Vite (fast development and builds)
-   **Styling**: TailwindCSS (utility-first CSS framework)
-   **AI Model**: Direct OpenRouter API access using `google/gemini-2.5-flash-image-preview:free` by default

## Local Development

### Prerequisites

-   Node.js 18+
-   npm or yarn

### Start the Development Environment

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit http://localhost:3000 to use the app.

### Production Build

```bash
# Build the production bundle
npm run build

# Preview the production build
npm run preview
```

## Deployment

### Deploy to Vercel

1. Fork this project to your GitHub account
2. Import the repository in [Vercel](https://vercel.com)
3. Vercel will detect it as a Vite project and deploy automatically

### Deploy to Netlify

1. Fork this project to your GitHub account
2. Connect the GitHub repository in [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

### Deploy to GitHub Pages

1. Fork this project
2. Enable GitHub Pages in the repository settings
3. Use GitHub Actions to build and deploy automatically

### Other Static Hosting Services

After building, the project outputs static files that can be hosted anywhere:

-   Cloudflare Pages
-   Firebase Hosting
-   AWS S3 + CloudFront
-   And more

## How to Use

1. Open the deployed website
2. Enter your OpenRouter API key in the "Settings" section
3. Upload one or more images (drag and drop supported)
4. Enter a text prompt describing what you want
5. Click the "Generate" button
6. Wait for the AI to produce a result

## Get an OpenRouter API Key

1. Visit [OpenRouter](https://openrouter.ai/)
2. Sign up and log in
3. Create a new API key from the API Keys page
4. Enter the API key into the app to get started

## Project Structure

```
src/
├── components/          # Vue components
│   ├── ApiKeyInput.vue     # API key input component
│   ├── ImageUpload.vue     # Image upload component
│   ├── PromptInput.vue     # Prompt input component
│   ├── GenerateButton.vue  # Generate button component
│   └── ResultDisplay.vue   # Result display component
├── services/           # API services
│   └── api.ts             # OpenRouter API wrapper
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.vue             # Root application component
├── main.ts             # Application entry point
└── style.css           # TailwindCSS styles
```

## Development Notes

-   Uses the Vue 3 Composition API
-   Full TypeScript coverage
-   Utility-first styles powered by TailwindCSS
-   Fast development and builds with Vite
-   Responsive design with mobile support

## License

MIT License
