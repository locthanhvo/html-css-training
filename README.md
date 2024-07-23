## React Revise

### Overview

- This document provides requirements and estimation for React Revise Practice.
- Design: [Figma](https://www.figma.com/design/hX2bXqOjYh1t37pobYH0Gh/Construction-Dashboard?node-id=1-2481&t=nbYvJTJRYGNidDFl-0)
- Plan: [Plan Practice](https://docs.google.com/document/d/1zTLGCSJ4SzfzM1K7gmi-B5ZiDCnO6d33xYBZfVlFIz0/edit)

### Target

- Avoid re-rendering components by combining useCallback, useMemo, and memo.
- Revise the basic concepts (useQuery, useMutation, invalidateQuery) as well as develop some advanced features (infinite queries…) of React query.
- Custom Chakra UI design system and take advantage of available components in Chakra UI.

### Timeline

- Estimate: 10 days (from July 4th, 2024 to July 17th, 2024).

### Technical

- Vite - v5.0.0
- Prettier - v3.1.0
- ESLint - v8.53.0
- React - v18.2.0
- TypeScript - v5.2.2
- Storybook - v7.5.3
- Jest - v29.7.0
- React Query - v.5.40.0
- React-Testing-Library - 14.1.2
- React Router - v6.19.0

### Requirements

- DASHBOARD PAGE

  + Display four lists of tasks including the “TODO” list, “IN WORK” list, “REVIEW” list, and “DONE” list.
  + These are infinite list by loading more for fetching data with 6 items per scroll down.
  + The user can view item details when clicking on each item.
  + The user can edit an item by clicking on the existing item on a list.
  + The user can add an item by clicking on the “+” icon on each header list or the new task at the bottom of each list.
  + The user can delete an item through the meatballs menu on each header list.

- UNIT TESTING

  + Unit test coverage is required over 90%.

- CHECKING PAGE SPEED

  + Checking the website page speed through the Lighthouse tool.

- DEPLOY WITH VERCEL

  + Reference link: https://vercel.com/

### Getting Started

- Step 1: Clone repository.

  + SSH: `$ git clone git@gitlab.asoft-python.com:loc.vo/react-training.git`.
  + HTTPS: `$ git clone https://gitlab.asoft-python.com/loc.vo/react-training.git`.

- Step 2:

  + Open terminal: `cd .\construction+dashboard\`
  + Install the packages `pnpm install`.

- Step 3:

  + Add file .env and add elements like .env.example
  + Run app:
    - Run web local: `pnpm dev`
    - Run json server: `pnpm start`

- Step 4:

  + Run Storybook: `pnpm storybook`.
  + Run Test: `pnpm test`

## Author

- Loc vo.
- Email: [loc.vo@asnet.com.vn](loc.vo@asnet.com.vn).
