const express = require('express');
const router = express.Router();

let employees = [
    { id: 1, name: 'John Doe', designation: 'Software Engineer', location: 'New York', salary: 70000 },
    { id: 2, name: 'Jane Smith', designation: 'Project Manager', location: 'Los Angeles', salary: 90000 },
];


router.get('/', (req, res) => {
    res.render('home', { employees });
});


router.get('/add', (req, res) => {
    res.render('employeeform', { employee: null });
});


router.post('/add', (req, res) => {
    const { name, designation, location, salary } = req.body;
    const newEmployee = {
        id: employees.length + 1,
        name,
        designation,
        location,
        salary: parseFloat(salary),
    };
    employees.push(newEmployee);
    res.redirect('/');
});


router.get('/edit/:id', (req, res) => {
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));
    res.render('employeeform', { employee });
});


router.post('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { name, designation, location, salary } = req.body;
    employees = employees.map(emp =>
        emp.id === parseInt(id)
            ? { ...emp, name, designation, location, salary: parseFloat(salary) }
            : emp
    );
    res.redirect('/');
});


router.get('/delete/:id', (req, res) => {
    employees = employees.filter(emp => emp.id !== parseInt(req.params.id));
    res.redirect('/');
});

module.exports = router;
