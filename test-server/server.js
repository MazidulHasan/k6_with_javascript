const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

// IMPORTANT: This parses JSON body
app.use(express.json());

const SECRET = "mysecretkey";

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body || {};

  if (username === "admin" && password === "1234") {
    const token = jwt.sign({ user: username }, SECRET, {
      expiresIn: "1h",
    });

    return res.json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

// Heavy route
app.get("/heavy-page", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, SECRET);

    // simulate heavy processing
    setTimeout(() => {
      res.json({ message: "Heavy page loaded" });
    }, 3000);

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

app.listen(8080, () => {
  console.log("Test server running on http://localhost:8080");
});