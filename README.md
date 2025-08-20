# Uzence-Design-Studio-Assignment
This project contains two reusable UI components built with React, TypeScript, TailwindCSS, and Storybook.
Components

1.InputField

A reusable input component with the following features:
-Label, placeholder, helper text, error message
-States: disabled, invalid
-Variants: filled | outlined | ghost
-Sizes: sm | md | lg
-Optional: clear button, password toggle

2.DataTable

A reusable data table component with the following features:
-Display tabular data
-Column sorting
-Row selection (single/multiple)
-Loading state
-Empty state

Tech Stack:

-React (with Vite)
-TypeScript
-TailwindCSS
-Storybook
-Vitest + React Testing Library

src/
 ├─ components/
 │   ├─ InputField/
 │   │   ├─ InputField.tsx
 │   │   ├─ InputField.stories.tsx
 │   │   └─ InputField.test.tsx
 │   ├─ DataTable/
 │   │   ├─ DataTable.tsx
 │   │   ├─ DataTable.stories.tsx
 │   │   └─ DataTable.test.tsx
 │   └─ index.ts
 ├─ App.tsx
 └─ main.tsx

Getting Started
1. Clone the repository and install dependencies
      git clone <your-repo-url>
      cd frontend-assignment
      npm install
2. Run the development server
       npm run dev
3. Run Storybook
       npm run storybook
4. Run tests
       npm run test

Demo:

App.tsx renders:
-One InputField (with clearable option)
-One DataTable (with sample data)

All other states (error, password toggle, loading, empty) are demonstrated in Storybook.

