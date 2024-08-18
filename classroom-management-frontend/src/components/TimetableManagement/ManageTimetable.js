import React, { useState, useEffect } from 'react';
import { fetchTimetables, createTimetable, fetchClassrooms } from '../../services/apiService';
import TimetableList from './TimetableList';

const ManageTimetable = ({ refreshClassrooms }) => {
  const [timetables, setTimetables] = useState([]);
  const [subject, setSubject] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [day, setDay] = useState('');
  const [classroomId, setClassroomId] = useState('');
  const [classrooms, setClassrooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadTimetables = async () => {
      try {
        const data = await fetchTimetables();
        setTimetables(data);
      } catch (error) {
        console.error('Error loading timetables:', error);
      }
    };

    const loadClassrooms = async () => {
      try {
        const data = await fetchClassrooms();
        setClassrooms(data);
      } catch (error) {
        console.error('Error loading classrooms:', error);
      }
    };

    loadTimetables();
    loadClassrooms();
  }, [refreshClassrooms]);

  const handleCreate = async () => {
    // Check if all fields are filled
    if (!subject || !startTime || !endTime || !day || !classroomId) {
      setErrorMessage('Please fill in all fields before creating a timetable.');
      return;
    }

    const selectedClassroom = classrooms.find(c => c._id === classroomId);

    if (!selectedClassroom.days.includes(day)) {
      setErrorMessage(`The selected day (${day}) is not within the classroom's scheduled days: [${selectedClassroom.days.join(', ')}].`);
      return;
    }

    try {
      await createTimetable({ subject, startTime, endTime, day, classroomId });
      setSubject('');
      setStartTime('');
      setEndTime('');
      setDay('');
      setClassroomId('');
      setErrorMessage(''); // Clear error message on successful creation
      const data = await fetchTimetables(); // Reload timetables after creation
      setTimetables(data);
    } catch (error) {
      console.error('Error creating timetable:', error);
      setErrorMessage('An error occurred while creating the timetable.');
    }
  };

  return (
    <div>
      <h4 className="text-xl font-semibold mb-2">Create Timetable</h4>
      {errorMessage && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {errorMessage}
        </div>
      )}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
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
          placeholder="Day (e.g., Monday)"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <select
          value={classroomId}
          onChange={(e) => setClassroomId(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        >
          <option value="">Select Classroom</option>
          {classrooms.map((classroom) => (
            <option key={classroom._id} value={classroom._id}>
              {classroom.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleCreate}
          className="bg-indigo-500 text-white p-2 rounded w-full"
        >
          Create Timetable
        </button>
      </div>
      <TimetableList
        timetables={timetables}
        classrooms={classrooms}
        setTimetables={setTimetables}
      />
    </div>
  );
};

export default ManageTimetable;
