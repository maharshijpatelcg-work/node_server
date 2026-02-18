const express = require("express");
const app = express();

app.use(express.json());

let users = [
    {
        att: "80",
        uid: 108243,
        total_sub: 14,
        bonus: "20",
        name: "Dax"
    }
];

app.post("/user", (req, res) => {
    const { att, uid, total_sub, bonus, name } = req.body;

    if (!att || !uid || !total_sub || !bonus || !name) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = users.find(u => u.uid === uid);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = { att, uid, total_sub, bonus, name };
    users.push(newUser);

    res.status(201).json({
        message: "User created successfully",
        user: newUser
    });
});

app.get("/user/:uid", (req, res) => {
    const uid = Number(req.params.uid);

    const user = users.find(u => u.uid === uid);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});





app.put("/user/:uid", (req, res) => {
    const uid = Number(req.params.uid);

    const userIndex = users.findIndex(u => u.uid === uid);

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users[userIndex] = {
        ...users[userIndex],
        ...req.body
    };

    res.json({
        message: "User updated successfully",
        user: users[userIndex]
    });
});


app.listen(2467, () => {
    console.log("Server running on port 2467");
});
