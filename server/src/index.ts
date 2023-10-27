import express from "express";

const PORT = 8000;
const app = express();
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "hello" });
});

app.listen(PORT, () => console.log("Server listen on port " + PORT));
