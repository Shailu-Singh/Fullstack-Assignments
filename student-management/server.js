
const express = require("express");

const app = express();

const PORT = 3000;

// Set EJS as template engine
app.set("view engine", "ejs");

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));

// Sample student data
let students = [
    { id: 1, name: "Rahul", course: "MCA" },
    { id: 2, name: "Aman", course: "BCA" },
    { id: 3, name: "Priya", course: "MCA" },
    { id: 4, name: "Neha", course: "B.Tech" },
    { id: 5, name: "Vikas", course: "BCA" }
];

// ROUTE 1: Home page (GET)
app.get("/", (req, res) => {
    res.render("home");
});

// ROUTE 2: Display all students (GET)
app.get("/students", (req, res) => {
    res.render("students", { students });
});

// ROUTE 3: Display add student form (GET)
app.get("/students/new", (req, res) => {
    res.render("add-student");
});

// ROUTE 4: Add new student (POST)
app.post("/students", (req, res) => {

    const newStudent = {
        id: students.length
            ? Math.max(...students.map(s => s.id)) + 1
            : 1,

        name: req.body.name,
        course: req.body.course
    };

    students.push(newStudent);

    res.redirect("/students");
});

// ROUTE 5: Display individual student (GET)
app.get("/students/:id", (req, res) => {

    const student = students.find(
        s => s.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).send("Student not found");
    }

    res.render("student-details", { student });
});

// ROUTE 6: About page (GET)
app.get("/about", (req, res) => {
    res.render("about");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
