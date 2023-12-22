const express = require('express');
const app = express();
const mysql = require('mysql2'); // Importa mysql2\
const cors = require('cors');
const PORT = 3001; // Puedes cambiar el puerto si es necesario

app.use(cors());

// Configura los parámetros de conexión a base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'crudbi'
  });

// Middleware para aceptar datos JSON
app.use(express.json());



// Ruta para obtener todos los estudiantes
app.get('/students', (req, res) => {
    connection.query(
      'CALL ObtenerEstudiantes()',
      (err, results) => {
        if (err) {
          console.error('Error calling stored procedure:', err);
          res.status(500).send('Error fetching students');
          return;
        }
        res.status(200).json(results[0]); // Los resultados se encuentran en el primer elemento del array
      }
    );
  });

// Ruta para agregar un estudiante
app.post('/students', (req, res) => {
    const { carnet, nombre, carrera } = req.body;
    connection.query(
      'CALL InsertarEstudiante(?, ?, ?)', 
      [carnet, nombre, carrera], 
      (err, results) => {
        if (err) {
          console.error('Error calling stored procedure:', err);
          res.status(500).send('Error adding student');
          return;
        }
        res.status(201).send('Student added successfully');
      }
    );
  });

// Ruta para actualizar un estudiante por su carnet
app.put('/students/:carnet', (req, res) => {
    const { carnet } = req.params;
    const { nombre, carrera } = req.body;
  
    connection.query(
      'CALL EditarEstudiante(?, ?, ?)',
      [carnet, nombre, carrera],
      (err, results) => {
        if (err) {
          console.error('Error calling stored procedure:', err);
          res.status(500).send('Error updating student');
          return;
        }
        res.status(200).send('Student updated successfully');
      }
    );
  });

// Ruta para eliminar un estudiante por su carnet
app.delete('/students/:carnet', (req, res) => {
    const { carnet } = req.params;
  
    connection.query(
      'CALL EliminarEstudiante(?)',
      [carnet],
      (err, results) => {
        if (err) {
          console.error('Error calling stored procedure:', err);
          res.status(500).send('Error deleting student');
          return;
        }
        res.status(200).send('Student deleted successfully');
      }
    );
  });

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
