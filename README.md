# ebuddy-test
This repository contains the source codes for technical tests at EBuddy

## Local Development Setup

### Run the backend locally
To run the backend repository locally on your machine:
- Prepare and download a firebase's service account json file from firebase console. 
- Rename it to `service_account.json` and place it in the `backend-repo/config/` folder.
- Install dependencies using `npm install`
- Run `npm run dev`

### Run the frontend locally
To run the frontend repository locally on your local machine:
- Create a new .env file based on the .env.example file, then fill in the needed .env from your firebase console.
- Run `npm run dev`, the app should be available at http://localhost:3000

## Using Firebase Emulator
To use firebase emulator, make sure you finished the section above, `Local Development Setup`. Then, continue the below steps:

### Backend
To run the backend with firebase emulated:
- Install firebase-tools using command `npm install -g firebase-tools`
- Run `npm run emulated`

### Frontend
To run the frontend with firebase emulated:
- Run `npm run emulated`

