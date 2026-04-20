const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

app.use(express.json());

// Secret key for JWT
const SECRET_KEY = "my_super_secret_key";

let students = [
  { id: 1, name: "Alice Bob", age: 21, grade: "A+" }
];

// Dummy user for login
const users = [
  { username: 'admin', password: 'password123' }
];

// Login endpoint to get JWT token
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    // Generate an access token
    const accessToken = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ accessToken });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  // The header usually looks like "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }
  
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    
    req.user = user;
    next();
  });
}

// 1. Get All Students (Authorized)
app.get('/students', authenticateToken, (req, res) => {
  res.json(students);
});

// 2. Get Single Student (Authorized)
app.get('/students/:id', authenticateToken, (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const student = students.find(s => s.id === studentId);
  
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

// 3. Create New Student (Authorized)
app.post('/students', authenticateToken, (req, res) => {
  const newStudent = {
    id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
    name: req.body.name,
    age: req.body.age,
    grade: req.body.grade
  };
  
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// 4. Update Student (Authorized)
app.put('/students/:id', authenticateToken, (req, res) => {
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

// 5. Delete Student (Authorized)
app.delete('/students/:id', authenticateToken, (req, res) => {
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
