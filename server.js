const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];

// GET users
app.get("/users", (req, res) => {
    res.json(users);
});

// POST user
app.post("/users", (req, res) => {
    const newUser = { _id: Date.now().toString(), ...req.body };
    users.push(newUser);
    res.json(newUser);
});

// DELETE user
app.delete("/users/:id", (req, res) => {
    users = users.filter(u => u._id !== req.params.id);
    res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));