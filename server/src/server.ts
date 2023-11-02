import { app } from "./app.js";

const PORT = 8000;

app.listen(PORT, () =>
  console.log("Server running and listen on port " + PORT)
);
