import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import studentService from '../src/utils/services/student-services'; 

function App() {
  const [newStudent, setNewStudent] = useState({ carnet: '', nombre: '', carrera: '' });
  const [studentsList, setStudentsList] = useState([]);

  const loadStudents = async () => {
    try {
      const students = await studentService.getAllStudents(); // Reemplaza con el método para obtener estudiantes
      setStudentsList(students);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await studentService.addStudent(newStudent);
      // Lógica adicional después de agregar el estudiante, por ejemplo, mostrar un mensaje de éxito
      alert('Student added successfully!');
    } catch (error) {
      // Manejo de errores, por ejemplo, mostrar un mensaje de error
      alert('Failed to add student');
    }

    
  };

  

  useEffect(() => {
    loadStudents();
  }, []); 

  return (
    <>
      <form onSubmit={handleSubmit} className="add-student-form">
      <div className="form-group">
        <label htmlFor="carnet">Carnet:</label>
        <input
          type="text"
          id="carnet"
          value={newStudent.carnet}
          onChange={(e) => setNewStudent({ ...newStudent, carnet: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={newStudent.nombre}
          onChange={(e) => setNewStudent({ ...newStudent, nombre: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="carrera">Carrera:</label>
        <input
          type="text"
          id="carrera"
          value={newStudent.carrera}
          onChange={(e) => setNewStudent({ ...newStudent, carrera: e.target.value })}
          required
        />
      </div>
      <button type="submit">Agregar Estudiante</button>
    </form>

    <div>
        <h2>Students List</h2>
        <ul>
          {studentsList.map((student) => (
            <li key={student.carnet}>
              {student.carnet} - {student.nombre} - {student.carrera}
            </li>
          ))}
        </ul>
      </div>
    </>

    
  );
}

export default App;
