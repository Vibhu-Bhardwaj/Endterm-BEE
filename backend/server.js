var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mysql = require('mysql');
var app = express();
var cors = require('cors');
app.use(express.static('public'));
app.use(session({ secret: "test123!@#" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const port = 8080;


const db = mysql.createConnection({
    hostname: "localhost",
    user: "root",
    password: "Vibhu@66896",
    database: "g10_21"
});


db.connect((err) => {
    if (err) {
        throw err;
    }
});

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('index');
});

//! SERVICES CURD
app.get('/services1', (req, res) => {
    db.query('SELECT * FROM Services', (err, services) => {
        if (err) throw err;
        res.render('servicesList', { services });
    });
});

app.get('/service/new', (req, res) => {
    res.render('addService');
});
// Handle form submission to add a new service
app.post('/service/new', (req, res) => {
    const { serviceName, description, price, currency } = req.body;

    db.query(
        'INSERT INTO Services (ServiceName, Description, Price, Currency) VALUES (?, ?, ?, ?)',
        [serviceName, description, price, currency],
        (err, result) => {
            if (err) throw err;

            res.redirect('/services1');
        }
    );
});

// Render the edit service form
app.get('/service/edit/:id', (req, res) => {
    const serviceId = req.params.id;

    // Fetch service information from the database
    db.query(
        'SELECT * FROM Services WHERE ServiceID = ?',
        [serviceId],
        (err, service) => {
            if (err) throw err;

            res.render('editServiceForm', { service: service[0] });
        }
    );
}); 
// Handle form submission to update a service
app.post('/service/edit/:id', (req, res) => {
    const serviceId = req.params.id;
    const { serviceName, description, price, currency } = req.body;

    db.query(
        'UPDATE Services SET ServiceName = ?, Description = ?, Price = ?, Currency = ? WHERE ServiceID = ?',
        [serviceName, description, price, currency, serviceId],
        (err) => {
            if (err) throw err;

            res.redirect('/services1');
        }
    );
});

// Handle service deletion
app.get('/service/delete/:id', (req, res) => {
    const serviceId = req.params.id;

    // Delete from the EmployeeServices table
    db.query('DELETE FROM User_Services WHERE service_id = ?', [serviceId], (err) => {
        if (err) throw err;

        // Delete from the ClientServices table
        db.query('DELETE FROM ClientServices WHERE ServiceID = ?', [serviceId], (err) => {
            if (err) throw err;

            // Delete from the ContactUs table
            db.query('DELETE FROM ContactUs WHERE ServiceID = ?', [serviceId], (err) => {
                if (err) throw err;

                // Delete from the Services table
                db.query('DELETE FROM Services WHERE ServiceID = ?', [serviceId], (err) => {
                    if (err) throw err;

                    res.redirect('/services1');
                });
            });
        });
    });
});


//! EMPLOYEE CURD

app.get('/employees', (req, res) => {
    db.query(
        'SELECT Employees.*, Services.ServiceName ' +
        'FROM Employees ' +
        'LEFT JOIN EmployeeServices ON Employees.EmployeeID = EmployeeServices.EmployeeID ' +
        'LEFT JOIN Services ON EmployeeServices.ServiceID = Services.ServiceID',
        (err, rows) => {
            if (err) {
                console.error(err);  // Log the error for debugging
                throw err;
            }

            const employeesMap = new Map();

            rows.forEach(row => {
                const { EmployeeID, EmployeeName, Email, Phone, Gender, ServiceName } = row;
                const employee = employeesMap.get(EmployeeID);

                if (employee) {
                    employee.Services.push(ServiceName);
                } else {
                    employeesMap.set(EmployeeID, {
                        EmployeeID,
                        EmployeeName,
                        Email,
                        Phone,
                        Gender,
                        Services: ServiceName ? [ServiceName] : [],
                    });
                }
            });

            const employees = [...employeesMap.values()];
            res.render('employeesList', { employees });
        }
    );
});

// Render the add employee form
app.get('/employee/new', (req, res) => {
    db.query('SELECT * FROM Services', (err, services) => {
        if (err) throw err;
        res.render('addEmployee', { availableServices: services });
    });
});

// Handle form submission to add a new employee
app.post('/employee/new', (req, res) => {
    const { employeeName, email, phone, gender, services } = req.body;

    // Insert new employee into the Employees table
    db.query(
        'INSERT INTO Employees (EmployeeName, Email, Phone, Gender) VALUES (?, ?, ?, ?)',
        [employeeName, email, phone, gender],
        (err, result) => {
            if (err) throw err;

            const employeeID = result.insertId;

            // Insert service and employee relationship into the EmployeeServices table
            if (Array.isArray(services)) {
                services.forEach((serviceID) => {
                    db.query(
                        'INSERT INTO EmployeeServices (EmployeeID, ServiceID) VALUES (?, ?)',
                        [employeeID, serviceID],
                        (err) => {
                            if (err) throw err;
                        }
                    );
                });
            } else if (services) {
                // If only one service is selected
                db.query(
                    'INSERT INTO EmployeeServices (EmployeeID, ServiceID) VALUES (?, ?)',
                    [employeeID, services],
                    (err) => {
                        if (err) throw err;
                    }
                );
            }
            res.redirect('/employees');
        }
    );
});



// Update the route for editing an employee
app.get('/employee/edit/:id', (req, res) => {
    const employeeId = req.params.id;
    // Fetch employee information from the database
    db.query(
        'SELECT * FROM Employees WHERE EmployeeID = ?',
        [employeeId],
        (err, employee) => {
            if (err) throw err;

            // Fetch services associated with the employee from EmployeeServices
            db.query(
                'SELECT ServiceID FROM EmployeeServices WHERE EmployeeID = ?',
                [employeeId],
                (err, employeeServices) => {
                    if (err) throw err;

                    // Fetch all services
                    db.query('SELECT * FROM Services', (err, availableServices) => {
                        if (err) throw err;
                        // Render 
                        res.render('editEmployeeForm', { employee: employee[0], availableServices, employeeServices });
                    });
                }
            );
        }
    );
});
app.post('/employee/edit/:id', (req, res) => {
    const employeeId = req.params.id;
    const { employeeName, email, phone, gender, services } = req.body;

    db.query(
        'UPDATE Employees SET EmployeeName = ?, Email = ?, Phone = ?, Gender = ? WHERE EmployeeID = ?',
        [employeeName, email, phone, gender, employeeId],
        (err) => {
            if (err) throw err;

            // Update employee and service relationship in the EmployeeServices table
            // First, delete existing entries
            db.query('DELETE FROM EmployeeServices WHERE EmployeeID = ?', [employeeId], (err) => {
                if (err) throw err;
                // Check if services is not null or an empty array
                if (services && services.length > 0) {
                    // Convert services to an array if it's a single value
                    const servicesArray = Array.isArray(services) ? services : [services];

                    // Insert updated entries
                    servicesArray.forEach((serviceId) => {
                        db.query(
                            'INSERT INTO EmployeeServices (EmployeeID, ServiceID) VALUES (?, ?)',
                            [employeeId, serviceId],
                            (err) => {
                                if (err) throw err;
                            }
                        );
                    });
                }
                // Redirect to the employees list page
                res.redirect('/employees');
            });
        }
    );
});

// Employee Deletion
app.get('/employee/delete/:id', (req, res) => {
    const employeeId = req.params.id;
    // Delete from the EmployeeServices table
    db.query('DELETE FROM EmployeeServices WHERE EmployeeID = ?', [employeeId], (err) => {
        if (err) throw err;

        // Delete from the Employees table
        db.query('DELETE FROM Employees WHERE EmployeeID = ?', [employeeId], (err) => {
            if (err) throw err;
            res.redirect('/employees');
        });
    });
});

//! Contactus CURD

// Add a route to handle displaying the list of contact inquiries
app.get('/contactus', (req, res) => {
    
    db.query(
        'SELECT ContactUs.*, Services.ServiceName FROM ContactUs ' +
        'LEFT JOIN Services ON ContactUs.ServiceID = Services.ServiceID',
        (err, inquiries) => {
            if (err) throw err;
            res.render('contactUsList', { inquiries });
        }
    );
});




app.post('/addUser', (req, res) => {
    const userData = req.body;
    const { confirmPassword, ...newUser } = userData;

    newUser.dor = new Date().toISOString().slice(0, 10);

    // Format datetime as 'YYYY-MM-DD HH:MM:SS'
    newUser.datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

    // Check if the email is already registered
    const checkEmailQuery = 'SELECT * FROM user WHERE email = ?';
    db.query(checkEmailQuery, [newUser.email], (checkErr, checkResult) => {
        if (checkErr) {
            console.error('Error checking email:', checkErr.message);
            return res.status(500).send('Error checking email');
        }
        if (checkResult.length > 0) {
            return res.status(200).json({ message: 'Email is already registered' });
        }
        // Insert user data into the database
        const insertUserQuery = `INSERT INTO user (name, email, pass, dob, address, gender, dor, datetime)VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [newUser.name, newUser.email, newUser.pass, newUser.dob, newUser.address, newUser.gender, newUser.dor, newUser.datetime];

        db.query(insertUserQuery, values, (insertErr, result) => {
            if (insertErr) {
                console.error('Error inserting user:', insertErr.message);
                return res.status(500).send('Error adding user');
            }
            res.status(200).json({ message: 'User added successfully' });
        });
    });
});

app.post('/signIn', (req, res) => {
    const { email, pass } = req.body;
    const sql = 'SELECT * FROM user WHERE email = ? AND pass = ?';
    db.query(sql, [email, pass], (err, results) => {
        if (err) {
            console.error('Error:', err.message);
            return res.status(500).json({ success: false, message: 'Error signing in' });
        }
        if (results.length > 0) {
            const user = results[0];
            req.session.user = user;
            res.status(200).json({ success: true, message: 'Sign-in successful', user });
        } else {
            res.status(401).json({ success: false, message: 'Wrong username or password' });
        }
    });
});


app.get('/checkAuth', (req, res) => {
    if (req.session.user) {
        res.json({ success: true, user: req.session.user });
    } else {
        res.json({ success: false });
    }
});






// API endpoint to get user details by uid
app.get('/getUser/:uid', (req, res) => {
    const userId = req.params.uid;
    const getUserQuery = 'SELECT * FROM user WHERE uid = ?';

    db.query(getUserQuery, [userId], (err, result) => {
        if (err) {
            console.error('Error getting user details:', err.message);
            return res.status(500).json({ success: false, message: 'Error getting user details' });
        }

        if (result.length > 0) {
            return res.status(200).json({ success: true, user: result[0] });
        } else {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
    });
});


app.put('/updateUser/:uid', (req, res) => {
    const userId = req.params.uid;
    const updatedUserData = req.body;

    const updateQuery = `
      UPDATE user
      SET name = ?, email = ? , gender = ?, address = ?
      WHERE uid = ?
    `;
    const values = [updatedUserData.name, updatedUserData.email, updatedUserData.gender, updatedUserData.address, userId,];

    db.query(updateQuery, values, (err, result) => {
        if (err) {
            console.error('Error updating user details:', err.message);
            return res.status(500).json({ success: false, message: 'Error updating user details' });
        }

        if (result.affectedRows > 0) {
            const s = `select * from user where uid = ?`;
            db.query(s, [userId], (err, result1) => {
                const user = result1[0];
                return res.status(200).json({ success: true, message: 'User details updated successfully', user: user });
            });
        }
        else {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
    });
});


app.get('/services', (req, res) => {
    const query = 'SELECT * FROM Services';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching services:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(results);
        }
    });
});

// Fetch user services
app.get('/user/:userId/services', (req, res) => {
    const userId = req.params.userId;
    const query = `
      SELECT Services.ServiceID, ServiceName, Description, Price, Currency
      FROM Services
      JOIN User_Services ON Services.ServiceID = User_Services.service_id
      WHERE user_id = ?;
    `;
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user services:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(results);
        }
    });
});

// Add user service
app.post('/user/service', (req, res) => {
    const { userId, serviceId } = req.body;
    // Delete existing user services
    db.query('DELETE FROM User_Services WHERE user_id = ?', [userId], (err) => {
        if (err) {
            console.error('Error deleting existing user services:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        // Check if serviceId is an array before using forEach
        if (Array.isArray(serviceId)) {
            // Insert updated entries
            serviceId.forEach((id) => {
                db.query(
                    'INSERT INTO User_Services (user_id, service_id) VALUES (?, ?)',
                    [userId, id],
                    (err) => {
                        if (err) {
                            console.error('Error adding user service:', err);
                            res.status(500).json({ error: 'Internal server error' });
                        }
                    }
                );
            });
        } else if (serviceId !== undefined) {
            // Handle the case when serviceId is a single value
            db.query(
                'INSERT INTO User_Services (user_id, service_id) VALUES (?, ?)',
                [userId, serviceId],
                (err) => {
                    if (err) {
                        console.error('Error adding user service:', err);
                        res.status(500).json({ error: 'Internal server error' });
                    }
                }
            );
        }

        res.json({ success: true, message: 'User services added successfully' });
    });
});



app.post('/contactus', (req, res) => {
    const { fullName, email, phone, message, serviceId } = req.body;
    const query = 'INSERT INTO ContactUs (FullName, Email, Phone, Message, ServiceID) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [fullName, email, phone, message, serviceId], (err, results) => {
        if (err) {
            console.error('Error inserting contact form data:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ success: true, message: 'Contact form data submitted successfully' });
        }
    });
});


app.delete('/deleteUser/:uid', (req, res) => {
    const userId = req.params.uid;

    db.query('DELETE FROM User_Services WHERE user_id = ?', [userId], (err) => {
        if (err) {
            console.error('Error deleting user services:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
        db.query('DELETE FROM user WHERE uid = ?', [userId], (err) => {
            if (err) {
                console.error('Error deleting user:', err);
                res.status(500).json({ success: false, message: 'Internal server error' });
                return;
            }

            res.json({ success: true, message: 'User deleted successfully' });
        });
    });
});

app.get('/services2', (req, res) => {
    const query = 'SELECT * FROM Services';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
        }
        else {
            res.json(results);
        }
    });
});





app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});














// //! CLIENT CURD
// // Render the client form
// app.get('/client/new', (req, res) => {

//     db.query('SELECT * FROM Services', (err, services) => {
//         if (err) throw err;
//         res.render('clientForm', { services });
//     });
// });

// //todo LIST
// app.get('/clients', (req, res) => {
//     db.query(
//         'SELECT Clients.*, Services.ServiceName FROM Clients LEFT JOIN ClientServices ON Clients.ClientID = ClientServices.ClientID LEFT JOIN Services ON ClientServices.ServiceID = Services.ServiceID',
//         (err, rows) => {
//             if (err) throw err;

//             const clientsMap = new Map();
//             rows.forEach(row => {
//                 const { ClientID, ClientName, Address, Email, Phone, Gender, ServiceName } = row;
//                 const client = clientsMap.get(ClientID);

//                 if (client) {
//                     if (ServiceName) {
//                         client.Services.push({ ServiceName });
//                     }
//                 } else {
//                     clientsMap.set(ClientID, {
//                         ClientID,
//                         ClientName,
//                         Address,
//                         Email,
//                         Phone,
//                         Gender,
//                         Services: ServiceName ? [{ ServiceName }] : [],
//                     });
//                 }
//             });

//             const clients = [...clientsMap.values()];

//             res.render('clientList', { clients });
//         }
//     );
// });

// app.post('/client/new', (req, res) => {
//     const { clientName, address, email, phone, gender, services } = req.body;

//     // Insert new client into the Clients table
//     db.query(
//         'INSERT INTO Clients (ClientName, Address, Email, Phone, Gender) VALUES (?, ?, ?, ?, ?)',
//         [clientName, address, email, phone, gender],
//         (err, result) => {
//             if (err) throw err;

//             const clientID = result.insertId;

//             // Insert service and client relationship into the ClientServices table
//             if (Array.isArray(services)) {
//                 services.forEach((serviceID) => {
//                     db.query(
//                         'INSERT INTO ClientServices (ClientID, ServiceID) VALUES (?, ?)',
//                         [clientID, serviceID],
//                         (err) => {
//                             if (err) throw err;
//                         }
//                     );
//                 });
//             } else if (services) {
//                 // If only one service is selected
//                 db.query(
//                     'INSERT INTO ClientServices (ClientID, ServiceID) VALUES (?, ?)',
//                     [clientID, services],
//                     (err) => {
//                         if (err) throw err;
//                     }
//                 );
//             }

//             res.redirect('/clients');
//         }
//     );
// });

// app.get('/client/delete/:id', (req, res) => {
//     const clientId = req.params.id;

//     // Delete the client and associated service from the ClientServices table
//     db.query('DELETE FROM ClientServices WHERE ClientID = ?', [clientId], (err) => {
//         if (err) throw err;

//         // Delete the client from the Clients table
//         db.query('DELETE FROM Clients WHERE ClientID = ?', [clientId], (err) => {
//             if (err) throw err;

//             res.redirect('/clients');
//         });
//     });
// });

// app.get('/client/edit/:id', (req, res) => {
//     const clientId = req.params.id;

//     // Fetch client information from the database
//     db.query(
//         'SELECT * FROM Clients WHERE ClientID = ?',
//         [clientId],
//         (err, client) => {
//             if (err) throw err;

//             // Fetch services from the database
//             db.query('SELECT * FROM Services', (err, services) => {
//                 if (err) throw err;
//                 // Fetch services associated with the client from ClientServices
//                 db.query(
//                     'SELECT ServiceID FROM ClientServices WHERE ClientID = ?',
//                     [clientId],
//                     (err, clientServices) => {
//                         if (err) throw err;

//                         // Render the edit client form
//                         res.render('editClientForm', { client: client[0], services, clientServices });
//                     }
//                 );
//             });
//         }
//     );
// });
// app.post('/client/edit/:id', (req, res) => {
//     const clientId = req.params.id;
//     const { clientName, address, email, phone, gender, services } = req.body;

//     db.query(
//         'UPDATE Clients SET ClientName = ?, Address = ?, Email = ?, Phone = ?, Gender = ? WHERE ClientID = ?',
//         [clientName, address, email, phone, gender, clientId],
//         (err) => {
//             if (err) throw err;
//             // Update client and service relationship in the ClientServices table
//             // First, delete existing entries
//             db.query('DELETE FROM ClientServices WHERE ClientID = ?', [clientId], (err) => {
//                 if (err) throw err;
//                 // Check if services is an array before using forEach
//                 if (Array.isArray(services)) {
//                     // Insert updated entries
//                     services.forEach((serviceId) => {
//                         db.query(
//                             'INSERT INTO ClientServices (ClientID, ServiceID) VALUES (?, ?)',
//                             [clientId, serviceId],
//                             (err) => {
//                                 if (err) throw err;
//                             }
//                         );
//                     });
//                 } else if (services !== undefined) {
//                     // Handle the case when services is a single value
//                     db.query(
//                         'INSERT INTO ClientServices (ClientID, ServiceID) VALUES (?, ?)',
//                         [clientId, services],
//                         (err) => {
//                             if (err) throw err;
//                         }
//                     );
//                 }
//                 res.redirect('/clients');
//             });
//         }
//     );
// });