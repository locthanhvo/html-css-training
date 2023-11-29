## React training

### Overview

- This document provides requirements and estimation for React practice.
- Design: [Figma](https://www.figma.com/file/vHINjTKxE7gKfsgtIHTLG4/Untitled?type=design&node-id=0-1&mode=design&t=S6zU9LLNkSMKupzL-0)
- Plan: [Plan Practice](https://docs.google.com/document/d/12MGTzXSbJILSK5YlrUp60VpkN1B0SlR-/edit)

### Target

- Understand the lifecycle of react component.
- Basic hooks in react

### Timeline

- Estimate: 12 days (from Nov 8th, 2023 to Nov 23th, 2023).

### Technical

- HTML5/CSS3
- TypeScript
- MockAPI v2.0.1
- Vite
- Prettier
- CSS module
- React
- Storybook

### Requirements

- LIST USERS
  - Display list users
  - Previous/Next pagination
  - Sort alphabetically by name, email, or date
  - Search by name, or email
- ADD/EDIT USERS
  - User form validations:
  - First/Last name: Required
  - Phone: Required, valid phone number format
  - Email: Required, valid email address format
  - User name: Required, 6 characters minimum
  - Password: Required, 8 characters minimum and at least 1 number, 1 special letter and 1 uppercase letter
  - Confirm password: Must match password value
  - Show error messages when the form is invalid and has submitted
  - Show snackbar when user submits form successfully/failed
- REMOVE USERS
  - Show modal to confirm before removing
  - Show snackbar when removing successfully/failed
- DEPLOY WITH VERCEL
  - Reference link: https://vercel.com/

### Getting Started

- Step 1: Clone repository.
  - SSH:
    - `$ git clone git@gitlab.asoft-python.com:loc.vo/react-training.git`.
  - HTTPS:
    - `$ git clone https://gitlab.asoft-python.com/loc.vo/react-training.git`.
- Step 2:
  - Install the packages `pnpm install`.
- Step 3:
  - Create a .env file at your root folder, add a env var API_ENDPOINT by MockAPI
    - API_ENDPOINT = `https://64e2c689bac46e480e77bdab.mockapi.io`
- Step 4:
  - Case 1: Run the practice `pnpm dev`.
  - Case 2: Ctrl + click `http://localhost:5173/`

## Author

- Loc vo.
- Email: [loc.vo@asnet.com.vn](loc.vo@asnet.com.vn).
