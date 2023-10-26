import express from "express";

const PORT = 8000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World !");
});


app.listen(PORT, () => console.log("Server listen on port " + PORT));
