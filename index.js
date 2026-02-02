const express = require("express");

const app = express();

const users = [
  { id: 1, name: "Rohan", role: "student" },
  { id: 2, name: "Priyesha", role: "mentor" },
  { id: 3, name: "anand", role: "student" },
  { id: 4, name: "maharshi", role: "core_leader" }
];

app.get("/", (req, res) => {
  res.send("Maharshi patel");
});

app.get("/route2", (req, res) => {
  res.send("Express server is running in route 2");
});

app.get("/users", (req, res) => {
  res.status(200).json(users);
});



app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

app.listen(2457, () => {
  console.log("Server started on port 2457");
});