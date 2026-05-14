const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;
const SECRET = "secret123";

app.use(bodyParser.json());
app.use(cors());

// In-memory storage
let users = [];
let students = [];

// ---------------- REGISTER ----------------
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and Password required" });
    }

    const exists = users.find(u => u.username === username);

    if (exists) {
        return res.status(400).json({ message: "User already exists" });
    }

    users.push({ username, password });

    res.status(201).json({ message: "Registered successfully" });
});

// ---------------- LOGIN ----------------
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and Password required" });
    }

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });

    res.json({
        message: "Login successful",
        token
    });
});

// ---------------- TOKEN VERIFY MIDDLEWARE ----------------
function verifyToken(req, res, next) {

    const header = req.headers['authorization'];

    if (!header) {
        return res.status(401).json({ message: "Access denied. No token provided" });
    }

    const token = header.split(" ")[1];

    jwt.verify(token, SECRET, (err, decoded) => {

        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }

        req.user = decoded;
        next();
    });
}

// ---------------- STUDENT CRUD ----------------

// CREATE
app.post('/students', verifyToken, (req, res) => {

    const { id, name, age, course } = req.body;

    if (!id || !name) {
        return res.status(400).json({
            message: "ID and Name required"
        });
    }

    const exists = students.find(s => s.id === id);

    if (exists) {
        return res.status(400).json({
            message: "Student already exists"
        });
    }

    const student = { id, name, age, course };

    students.push(student);

    res.status(201).json({
        message: "Student added",
        student
    });
});

// READ ALL
app.get('/students', verifyToken, (req, res) => {
    res.json(students);
});

// READ ONE
app.get('/students/:id', verifyToken, (req, res) => {

    const student = students.find(
        s => s.id === req.params.id
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

// UPDATE
app.put('/students/:id', verifyToken, (req, res) => {

    const student = students.find(
        s => s.id === req.params.id
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, age, course } = req.body;

    if (name) student.name = name;
    if (age) student.age = age;
    if (course) student.course = course;

    res.json({
        message: "Student updated",
        student
    });
});

// DELETE
app.delete('/students/:id', verifyToken, (req, res) => {

    const index = students.findIndex(
        s => s.id === req.params.id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deleted = students.splice(index, 1);

    res.json({
        message: "Student deleted",
        deleted
    });
});

// ---------------- SERVER ----------------
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});