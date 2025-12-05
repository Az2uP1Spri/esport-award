const express = require("express");
const path = require("path");
const { games } = require("./data/esportData");

const app = express();
const PORT = 3000;

// Configuration des fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Configuration du moteur de templates EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/vote", (req, res) => {
  res.render("vote", { games });
});

app.get("/about", (req, res) => {
  res.render("about");
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log("ESPORT AWARD running on http://localhost:3000");
});

