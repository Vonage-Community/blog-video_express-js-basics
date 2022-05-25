const express = require("express");
const app = express();
app.use(express.json());


// Create session and provide credentials
require("dotenv").config();
const OpenTok = require("opentok");
const opentok = new OpenTok(process.env.API_KEY, process.env.API_SECRET);

app.get("/api/session", (req, res) => {
  opentok.createSession({ mediaMode: "routed" }, (err, session) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.setHeader("Content-Type", "application/json");
    res.send({
      apiKey: process.env.API_KEY,
      sessionId: session.sessionId,
      token: opentok.generateToken(session.sessionId),
    });
  });
});


// Serve HTML
const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
