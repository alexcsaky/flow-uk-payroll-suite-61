# Bolt Admin UI Prototype

## Project Overview

This is a modern admin UI prototype built for payroll and billing management. The application provides a comprehensive dashboard and various management interfaces for employees, payroll, timesheets, approvals, reports, clients, invoices, and payments.

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and development server
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **React Router** - For navigation and routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable UI components built with Radix UI
- **Recharts** - Charting library for data visualization
- **React Query** - For data fetching and state management
- **Lucide Icons** - SVG icon library

## Getting Started

### Prerequisites

- Node.js (v16.0.0 or later)
- npm or Bun

### Installation

```sh
# Step 1: Clone the repository
git clone https://github.com/yourusername/bolt-admin-ui.git

# Step 2: Navigate to the project directory
cd prototype-admin-ui

# Step 3: Install the necessary dependencies
npm install
# or if using Bun
bun install

# Step 4: Start the development server
npm run dev
# or with Bun
bun run dev
```

The app will be available at `http://localhost:8080`.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Project Structure

```
prototype-admin-ui/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── dashboard/  # Dashboard-specific components
│   │   ├── layout/     # Layout components (header, sidebar, etc.)
│   │   └── ui/         # Base UI components from shadcn/ui
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and services
│   ├── pages/          # Page components for each route
│   ├── App.tsx         # Main application component with routing
│   ├── index.css       # Global styles
│   └── main.tsx        # Application entry point
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Adding Tests

This project currently doesn't have tests set up. Here's how to add testing capabilities:

### Setting Up Jest with React Testing Library

1. Install the necessary dependencies:

```sh
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

2. Create a jest configuration file (`jest.config.js`) in the root directory:

```js
export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
```

3. Create a setup file (`jest.setup.js`) for Jest:

```js
import "@testing-library/jest-dom";
```

4. Add test scripts to your `package.json`:

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

5. Create a `__tests__` directory in your project structure or add test files next to the components with a `.test.tsx` or `.spec.tsx` extension.

### Example Component Test

```tsx
// src/components/ui/button.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    await userEvent.click(screen.getByRole("button", { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Deployment

To deploy this application:

1. Build the project for production:

```sh
npm run build
```

2. The build output will be generated in the `dist` directory.

3. Deploy the contents of the `dist` directory to your preferred hosting service (Netlify, Vercel, GitHub Pages, etc.).

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
