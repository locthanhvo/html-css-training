## React Revise

### Overview

- This document provides requirements and estimation for React Revise Practice.
- Design: [Figma](https://www.figma.com/design/nbNc3nrYJ06gIXH1smzXG1/Untitled?node-id=0-1&t=MjqBUYK81g7OwsoQ-0)
- Plan: [Plan Practice](https://docs.google.com/document/d/1Lwd1bu-RdQHlxvNAQaHW4xohsSOMYv7E3P-KzESE7wU/edit)

### Target

- React-Advance: reinforce the knowledge and understanding of how the useMemo and useCallback operate.
- Unit testing: understand how to test for all the parts (snapshot, React component, React hooks, asynchronous operations… ) needed in a basic web application.
- React-Query: apply best practices for this section based on the basic existing knowledge as well as experience in using React-Query.
- Learning new tech stacks such as Zustand for managing local state and applying the Chakra UI library in the practice.

### Timeline

- Estimate: 12 days (from May 24th, 2024 to June 12th, 2024).

### Technical

- Vite
- Prettier
- ESLint
- React
- TypeScript
- Storybook
- Jest
- React Query
- Zustand
- React-Testing-Library
- React Router v6

### Requirements

- SIGN IN/ SIGN UP PAGE

  - Users can sign up for a new account (not duplicate to the existing account).
  - Users can sign in to the site with an existing account.
  - Validation rules:
    - The email is required.
    - The password is required.
    - The valid email format complies with the standard email.
    - The valid password format has at least 8 characters including at least one special letter, one uppercase letter.

- DASHBOARD PAGE

  - Users must sign in by the registered account to be able to access the dashboard page.
  - User navigation

    - Display list of users in table form including pagination.
    - The user can search the displayed users by name, email, phone number, and status.
    - The user can add/edit the display user through the user form.

  - Control navigation

    - The user can switch between the list of companies and the list of nations through nav-tab.
    - Company tab:
      - Display a list of companies in table form including pagination.
      - The user can search the displayed companies by name, email, phone number, and status.
      - The user can add/edit the display company through the company form.
      - The user can remove the display company by icon on the table.
    - Control Settings tab:
      - Display a list of brigades, a list of control teams, a List of stagecoaches, and members of the CRCA as a list form.
      - The user can search the displayed item by name.
      - The user can add/edit the item through the item form.
      - The user can remove the item by the button on the list.

- DEPLOY WITH VERCEL

  - Reference link: https://vercel.com/

### Getting Started

- Step 1: Clone repository.
  - SSH:
    - `$ git clone git@gitlab.asoft-python.com:loc.vo/react-training.git`.
  - HTTPS:
    - `$ git clone https://gitlab.asoft-python.com/loc.vo/react-training.git`.
- Step 2:
  - Open terminal: `cd .\workflow-practice\`
  - Install the packages `pnpm install`.
- Step 3:
  - Run app:
    - Run web local: `pnpm dev`
    - Run json server: `pnpm start`
- Step 4:
  - Run Storybook: `pnpm storybook`.
  - Run Test: `pnpm test`

## Author

- Loc vo.
- Email: [loc.vo@asnet.com.vn](loc.vo@asnet.com.vn).
