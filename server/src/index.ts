import cors from 'cors';
import express from "express";


import auth from "./auth/router.js";
const PORT = 8000;
const app = express();
app.use(cors())
app.use(express.json());

async function start() {
  try {
    app.listen(PORT, () =>
      console.log("Server running and listen on port " + PORT)
    );
  } catch (err) {
    console.log(err);
  }
}

app.use("/auth", auth);

start();
