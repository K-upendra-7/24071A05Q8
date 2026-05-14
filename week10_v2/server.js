const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// In-memory database
let students = [];

// CREATE
app.post('/students', (req, res) => {
    const { id, name, age, course } = req.body;

    if (!id || !name) {
        return res.status(400).json({ message: "ID and Name required" });
    }

    const exists = students.find(s => s.id === id);
    if (exists) {
        return res.status(400).json({ message: "Student already exists" });
    }

    const student = { id, name, age, course };
    students.push(student);

    res.status(201).json({ message: "Student added", student });
});

// READ ALL
app.get('/students', (req, res) => {
    res.json(students);
});

// READ ONE
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === req.params.id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});

// UPDATE
app.put('/students/:id', (req, res) => {
    const student = students.find(s => s.id === req.params.id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const { name, age, course } = req.body;

    if (name) student.name = name;
    if (age) student.age = age;
    if (course) student.course = course;

    res.json({ message: "Student updated", student });
});

// DELETE
app.delete('/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    const deleted = students.splice(index, 1);

    res.json({ message: "Student deleted", deleted });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});