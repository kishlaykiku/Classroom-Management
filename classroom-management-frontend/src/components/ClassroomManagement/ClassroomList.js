import React, { useEffect, useState } from 'react';
import { fetchClassrooms, deleteClassroom, fetchUsers } from '../../services/apiService';

const ClassroomList = ({ onClassroomDeleted }) => {
  const [classrooms, setClassrooms] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const loadClassroomsAndUsers = async () => {
      try {
        const classroomData = await fetchClassrooms();
        const userData = await fetchUsers();
        setClassrooms(classroomData);
        setTeachers(userData.filter(user => user.role === 'Teacher'));
        setStudents(userData.filter(user => user.role === 'Student'));
      } catch (error) {
        console.error('Error loading classrooms or users:', error);
      }
    };

    loadClassroomsAndUsers();
  }, []);

  const handleDelete = async (classroomId) => {
    try {
      await deleteClassroom(classroomId);
      setClassrooms(classrooms.filter(classroom => classroom._id !== classroomId));
      onClassroomDeleted();  // Trigger refresh in other components
    } catch (error) {
      console.error('Error deleting classroom:', error);
    }
  };

  const getTeacherName = (teacherId) => {
    const teacher = teachers.find(teacher => teacher._id === teacherId);
    return teacher ? teacher.name : 'Not Assigned';
  };

  const getStudentNames = (studentIds) => {
    return students
      .filter(student => studentIds.includes(student._id))
      .map(student => student.name)
      .join(', ');
  };

  return (
    <div>
      <h4 className="text-xl font-semibold mb-2">Classrooms</h4>
      <ul className="list-disc pl-5 space-y-2">
        {classrooms.map((classroom) => (
          <li key={classroom._id} className="p-2 border rounded flex justify-between items-center">
            <div>
              <p><strong>Name:</strong> {classroom.name}</p>
              <p><strong>Days:</strong> [{classroom.days.join(', ')}]</p>
              <p><strong>Start Time:</strong> {classroom.startTime}</p>
              <p><strong>End Time:</strong> {classroom.endTime}</p>
              <p><strong>Teacher:</strong> {getTeacherName(classroom.teacherId)}</p>
              <p><strong>Students:</strong> {getStudentNames(classroom.students)}</p>
            </div>
            <button
              onClick={() => handleDelete(classroom._id)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassroomList;
