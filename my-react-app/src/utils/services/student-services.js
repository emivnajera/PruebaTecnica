import axios from 'axios';

const baseURL = 'http://localhost:3001';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});


const studentService = {
    getAllStudents: async () => {
        try {
          const response = await axiosInstance.get('/students');
          return response.data;
        } catch (error) {
          throw new Error('Failed to fetch students');
        }
      },
    addStudent: async (studentData) => {
      try {
        const response = await axiosInstance.post('/students', studentData);
        console.log(studentData);
        return response.data;
      } catch (error) {
        console.log(error)
        throw new Error('Failed to add student');
      }
    },
  };
  
  export default studentService; 