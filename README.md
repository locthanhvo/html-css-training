## Typescript training

### Overview

- This document provides requirements and estimation for TypeScript practice.
- Design: [Figma](<https://www.figma.com/file/hArsyvx1eOGsDcQyfbO1Xq/User-Management-CMS-(Community)?node-id=212%3A698&mode=dev>)
- Plan: [Plan Practice](https://docs.google.com/document/d/125RwSFYXPu-rD-5SZ6dFYec1BFHzRe7fMlRPVa2s7T8/edit)

### Target

- Get familiar and understand power of TypeScript language in specific and typed language in general

### Timeline

- Estimate: 08 days (from Oct 05th, 2023 to Oct 16th, 2023).

### Technical

- HTML5/CSS3
- Typescript
- MockAPI v2.0.1
- Parcel v2.9.3

### Requirements

- LIST USERS
  - Display list users
  - Previous/Next pagination
  - Sort alphabetically by name, email
  - Search by name
- ADD/EDIT USERS
  - User form validations:
  - First/Last name: Required
  - Phone: Required, valid phone number format
  - Email: Required, valid email address format
  - Gender: Required (Male, Female)
  - User name: Required, 6 characters minimum
  - Password: Required, 8 characters minimum and at least 1 number, 1 special letter and 1 uppercase letter
  - Confirm password: Must match password value
  - Permission: Include Read, Write, Delete for each resources: Users, documents, photos
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
    - `$ git clone git@gitlab.asoft-python.com:loc.vo/typescript-training.git`.
  - HTTPS:
    - `$ git clone https://gitlab.asoft-python.com/loc.vo/typescript-training.git`.
- Step 2:
  - Install the packages `npm i` or `pnpm install`.
- Step 3:
  - Create a .env file at your root folder, add a env var API_ENDPOINT by MockAPI
    - API_ENDPOINT = `https://64e2c689bac46e480e77bdab.mockapi.io`
- Step 4:
  - Case 1: Run the practice `npm start` or `pnpm start`.
  - Case 2: Ctrl + click `http://localhost:1234`

## Author

- Loc vo.
- Email: [loc.vo@asnet.com.vn](loc.vo@asnet.com.vn).
