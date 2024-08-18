import React from 'react';
import { deleteTimetable } from '../../services/apiService';

const TimetableList = ({ timetables, classrooms, setTimetables }) => {

  const handleDelete = async (timetableId) => {
    try {
      await deleteTimetable(timetableId);
      setTimetables(timetables.filter(timetable => timetable._id !== timetableId));
    } catch (error) {
      console.error('Error deleting timetable:', error);
    }
  };

  const getClassName = (classroomId) => {
    const classroom = classrooms.find(c => c._id === classroomId);
    return classroom ? classroom.name : 'Unknown Classroom';
  };

  return (
    <div>
      <h4 className="text-xl font-semibold mb-2">Timetables</h4>
      <ul className="list-disc pl-5 space-y-2">
        {timetables.map((timetable) => (
          <li key={timetable._id} className="p-2 border rounded flex justify-between items-center">
            <div>
              <p><strong>Subject:</strong> {timetable.subject}</p>
              <p><strong>Timing:</strong> {timetable.startTime} - {timetable.endTime} ({timetable.day})</p>
              <p><strong>Classroom:</strong> {getClassName(timetable.classroomId)}</p>
            </div>
            <button
              onClick={() => handleDelete(timetable._id)}
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

export default TimetableList;
