import React from 'react';
import { Link } from 'react-router-dom';

export default function StudentHome(){
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return (
    <div className="container">
      <h2>Student Home</h2>
      <p>Welcome {user ? user.firstName : 'Student'}</p>
      <nav>
        <Link to="/student/hostel">Hostel</Link>
      </nav>
    </div>
  )
}
