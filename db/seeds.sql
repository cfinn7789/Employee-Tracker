INSERT INTO department (department_name) VALUES
  ('Finance'),
  ('Sales'),
  ('Engineering');

INSERT INTO role (title, salary, department_id) VALUES
  ('Account Manager', '60000', 1),
  ('Sales Lead', '40000', 2),
  ('Software Engineer', '80000', 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 3, NULL), 
  ('Jane', 'Smith', 2, 1),  
  ('Alice', 'Johnson', 1, NULL);