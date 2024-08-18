import React, { useState, useEffect } from 'react';
import { fetchUsers, createClassroom } from '../../services/apiService';

const CreateClassroom = ({ onClassroomCreated, refreshTeachers }) => {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [days, setDays] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadTeachersAndStudents = async () => {
      try {
        const data = await fetchUsers();
        setTeachers(data.filter(user => user.role === 'Teacher'));
        setStudentList(data.filter(user => user.role === 'Student'));
      } catch (error) {
        console.error('Error loading users:', error);
      }
    };

    loadTeachersAndStudents();
  }, [refreshTeachers]);

  const handleAddStudent = () => {
    if (selectedStudent && !students.includes(selectedStudent)) {
      setStudents([...students, selectedStudent]);
      setSelectedStudent('');
    }
  };

  const handleRemoveStudent = (studentId) => {
    setStudents(students.filter(id => id !== studentId));
  };

  const handleCreate = async () => {
    if (!name || !startTime || !endTime || !days || !teacherId || students.length === 0) {
      setErrorMessage('Please fill in all fields and select at least one student before creating a classroom.');
      return;
    }

    const selectedDays = days.split(',').map(d => d.trim());

    try {
      await createClassroom({ name, startTime, endTime, days: selectedDays, teacherId, students });
      setName('');
      setStartTime('');
      setEndTime('');
      setDays('');
      setTeacherId('');
      setStudents([]);
      setErrorMessage('');
      onClassroomCreated();
    } catch (error) {
      console.error('Error creating classroom:', error);
      setErrorMessage('An error occurred while creating the classroom.');
    }
  };

  return (
    <div>
      <h4 className="text-xl font-semibold mb-2">Create Classroom</h4>
      {errorMessage && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {errorMessage}
        </div>
      )}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Classroom Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Start Time (e.g., 09:00 AM)"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="End Time (e.g., 10:00 AM)"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Days (e.g., Monday, Wednesday)"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <select
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        >
          <option value="">Select Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.name}
            </option>
          ))}
        </select>
        
        <div className="mb-4 flex items-center">
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="border p-2 rounded flex-grow mb-2"
          >
            <option value="">Select Student</option>
            {studentList.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddStudent}
            className="bg-blue-500 text-white p-1 rounded ml-2 w-auto text-sm"
          >
            Add Student
          </button>
        </div>
        
        <div className="mb-4">
          <h5 className="text-lg font-semibold">Selected Students</h5>
          <ul className="list-disc pl-5">
            {students.map((studentId) => {
              const student = studentList.find(s => s._id === studentId);
              return (
                <li key={studentId} className="flex justify-between items-center">
                  <span>{student ? student.name : 'Unknown Student'}</span>
                  <button
                    onClick={() => handleRemoveStudent(studentId)}
                    className="bg-red-500 text-white p-1 rounded text-xs"
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        
        <button
          onClick={handleCreate}
          className="bg-indigo-500 text-white p-2 rounded w-full"
        >
          Create Classroom
        </button>
      </div>
    </div>
  );
};

export default CreateClassroom;
