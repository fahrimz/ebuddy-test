# ebuddy-test
This repository contains the source codes for technical tests at EBuddy

## Local Development Setup

### Backend preparation
To run the backend repository locally on your machine:
- Prepare and download a firebase's service account json file from firebase console. 
- Rename it to `service_account.json` and place it in the `apps/backend-repo/config/` folder.

### Frontend preparation
To run the frontend repository locally on your local machine:
- Create a new .env file based on the .env.example file, then fill in the needed .env from your firebase console.

### Running the project

This project uses turborepo to run the tasks of each apps (backend, frontend).

To start the project with emulated firebase (local), run:
```bash
pnpm install
pnpm run emulated
```

To start without emulation, run:
```bash
pnpm install
pnpm run dev
```
