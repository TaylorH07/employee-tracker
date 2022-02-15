INSERT INTO department (id, name)
VALUES
(1, 'Leads'),
(2, 'Effects'),
(3, 'Roles'),
(4, 'Operations'),
(5, 'Characters');

INSERT INTO role (id, title, salary, department_id)
VALUES 
    ('Main Character', 1000000, 1),
    ('Side Character', 500000, 1),
    ('Important Lead', 1500000, 2), 
    ('Generic Character', 75000, 2),
    ('Special Effects', 240000, 3), 
    ('Purposeful Role', 990000, 3),
    ('Background Character',45000, 4),
    ('Operational Character', 320000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Bugs', 'Bunny', 1, null),
    ('Lola', 'Bunny', 1, 2),
    ('Daffy', 'Duck', 2, 2),
    ('Sylvester', 'DaCat', 2, null),
    ('Yosemite', 'Sam', 1, 1),
    ('Foghorn', 'Leghorn', 4, null),
    ('Elmer', 'Fudd', 3, 3),
    ('Tweety', 'LeBird', 6, null),
    ('Pepe', 'LePew', 5, 5),
    ('Tasmanian', 'Devil', 7, null),
    ('Speedy', 'Gonzales', 8, 7);

