import * as functions from "firebase-functions";
import app from "./core/app";

if (process.env.FUNCTIONS_EMULATOR !== "true") {
  const APP_PORT = process.env.PORT || 3001;

  app.listen(APP_PORT, () => {
    console.log(`app running on port ${APP_PORT}`);
  });
}

export const api = functions.https.onRequest(app);
