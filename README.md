## NextJS

### Overview

- This document provides requirements and estimation for NextJS Practice.
- Design: [Figma](https://www.figma.com/design/GpIJyixhchvGv6rSUXuSH8/Untitled?node-id=1-1326&t=DLQY37fXcEdjlz2A-0)
- Plan: [Plan Practice](https://docs.google.com/document/d/103L9jR_f7gwNPTMH6B9Gq7zwj8WmpVNmo0cS6fq4kew/edit)

### Target

- AInitialize a Next.js application using a single command line or migrate to the Next.js latest version from current practice.
- Get familiar with the outstanding features of Next.js, especially routing, caching, streaming, and data fetching.
- Know how a Next.js application works and accomplish a full-stack web application.
- Be required to pass the instruction course by recording the quiz during implementation.
- Although this is Next.js practice, Unit testing, and Storybook are still mandatory.

### Timeline

- Estimate: 12 days (from August 28th, 2024 to September 16th, 2024).

### Technical

- Prettier - v3.1.5
- ESLint - v8
- TypeScript - v5
- Storybook - v8.1.2
- Jest - v29.7.0
- React-Testing-Library - V15.0.7
- React Hook Form - v7.52.0

### Requirements

- USER LIST PAGE

  - Display all users including pagination (selectable quantity of rows shown on each page)
  - The admin can add new products by clicking the “Add User” button.
  - The admin can search users by user name (does not include insensitive cases).
  - The admin can delete the user by clicking on the trash icon on each table row.

- ADD USER PAGE

  - The admin has to fill in the personal and basic information on the “Personal Information” tab.
  - The admin has to fill in the team information on the “Team” tab.
  - The admin has to fill in the team information on the “Team” tab.
  - The admin has to fill in the billing address and select the payment methods on the “Billing” tab.
  - The admin has to select the options in the “General notifications” and “Summary notifications” sections on the “Notifications” tab
  - The admin can submit a new user by the “Add User” button on the Notifications tab.

- EDIT USER PAGE

  - The user information will be populated on each tab and edited eventually through the “Save” button on the Notifications Tab

- UNIT TESTING

  - Unit test coverage is required over 90%.

- CHECKING PAGE SPEED

  - Checking the website page speed through the Lighthouse tool.

- DEPLOY WITH VERCEL

  - Reference link: https://vercel.com/

### Getting Started

- Step 1: Clone repository.

  - SSH: `$ git clone git@gitlab.asoft-python.com:loc.vo/nextjs-training.git`.
  - HTTPS: `$ git clone https://gitlab.asoft-python.com/loc.vo/nextjs-training.git`.

- Step 2:

  - Open terminal: `cd .\dashdark\`
  - Install the packages `pnpm install`.

- Step 3:

  - Add file .env and add elements like .env.example

- Step 4:

  - Run Storybook: `pnpm storybook`.
  - Run Test: `pnpm test`

## Author

- Loc vo.
- Email: [loc.vo@asnet.com.vn](loc.vo@asnet.com.vn).
