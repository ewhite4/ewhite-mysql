INSERT INTO department(id, name)
    VALUES
    (1, "Legal"),
    (2, "Engineering"),
    (3, "Finance"),
    (4, "Sales");

INSERT INTO role(id, title, salary, department_id)
    VALUES
    (1, "Sales Person", 80000, 4),
    (2, "Lead Engineer", 150000, 2),
    (3, "Software Engineer", 120000, 2),
    (4, "Account Manager", 160000, 3),
    (5, "Accountant", 100000, 3), 
    (6, "Legal Team Lead", 250000, 1),
    (7, "Legal", 190000, 1);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
    VALUES
    (4, "Mike", "Chan", 1),
    (2, "Ashley", "Rodriguez", 2),
    (2, "Kevin", "Tupik", 3),
    (3, "Kunal", "Singh", 4),
    (3, "Malia", "Brown", 5),
    (1, "Sarah", "Lourd", 6),
    (1, "Tom", "Allen", 7);
