const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let students = [
  { id: 1, name: "Alice Bob", age: 21, grade: "A+" }
];

// 1. Get All Students
app.get('/students', (req, res) => {
  res.json(students);
});

// 2. Get Single Student
app.get('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const student = students.find(s => s.id === studentId);
  
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

// 3. Create New Student
app.post('/students', (req, res) => {
  const newStudent = {
    id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
    name: req.body.name,
    age: req.body.age,
    grade: req.body.grade
  };
  
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// 4. Update Student
app.put('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const studentIndex = students.findIndex(s => s.id === studentId);
  
  if (studentIndex !== -1) {
    // Update fields appropriately
    students[studentIndex] = { ...students[studentIndex], ...req.body };
    res.json(students[studentIndex]);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

// 5. Delete Student
app.delete('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const studentIndex = students.findIndex(s => s.id === studentId);
  
  if (studentIndex !== -1) {
    const deletedStudent = students.splice(studentIndex, 1);
    res.json(deletedStudent[0]);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

app.listen(port, () => {
  console.log(`Server will run at: http://localhost:${port}`);
});
