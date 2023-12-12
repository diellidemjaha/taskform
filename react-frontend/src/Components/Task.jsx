import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';
import Swal from 'sweetalert2';
import axios from 'axios';

const Task = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState('');
  const [categories, setCategories] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };
  
    try {
      const response = await axios.post(
        'http://localhost:8000/api/tasks/new-task',
        {
          title: taskName,
          description: description,
          // users: user,
          user_ids: [8, 9],
          // categories: categories,
          start_date: startDate,
          end_date: endDate,
        },
        { headers: headers } // Pass the headers object here
      );

      if (response.status === 201) {
        // Task created successfully
        Swal.fire('Task created successfully!');
        // Optionally, you can reset the form fields after successful submission
        setTaskName('');
        setDescription('');
        setUser('');
        setCategories('');
        setStartDate('');
        setEndDate('');
        // You can also update the UI with the new task data if needed
        // For example, if you have a list of tasks, you can add the new task to the list
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error creating the task!',
        });
        console.error('Error creating task:', response.status);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error creating the task!',
      });
      console.error('Error creating task:', error);
    }
  };

  return (
    <>
      {/* <Navbar/> */}
      <div className="container text-center bg-light mt-4 mx-auto">
        <div className="row">
          <div className="col-sm-8 p-4">
            <h4 className="text-warning">Make a new Task</h4>
            <input
              className="form-control form-control-lg mb-4"
              type="text"
              placeholder="Task name"
              name="title"
              aria-label=".form-control-lg example"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <input
              className="form-control form-control-lg mb-4"
              type="textarea"
              placeholder="Description"
              name="description"
              aria-label=".form-control-lg example"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* <input
              className="form-control mb-4"
              type="text"
              name="users"
              placeholder="Choose from users list"
              aria-label="default input example"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            /> */}
            <input
              className="form-control form-control-sm mb-4"
              type="text"
              placeholder="Choose categories"
              aria-label=".form-control-sm example"
              name="categories"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
            />
            <label>Start Date:</label>
            <input
              className="form-control mb-4"
              type="date"
              value={startDate}
              name="startDate"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label>End Date:</label>
            <input
              className="form-control mb-4"
              type="date"
              value={endDate}
              name="endDate"
              onChange={(e) => setEndDate(e.target.value)}
            />
            <input
              type="submit"
              className="btn btn-outline-warning mb-4"
              onClick={handleSubmit}
            />
          </div>
          <div className="col-sm-4 p-4">
            <h4 className="text-warning">Choose users from list:</h4>
            <ul className="list-group">
              <li className="list-group-item">Dielli</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mt-3 mx-auto">
        <div className="row">
          <div className="col-sm-12 p-4">
            <div className="text-center container bg-warning m-2 p-2 text-light fw-bold rounded-1">List of tasks</div>
          </div>
        </div>
        <div className="row">
          <div className="container bg-light text-dark">{/* Content for list of tasks goes here */}</div>
        </div>
      </div>
    </>
  );
};

export default Task;
