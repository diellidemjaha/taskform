import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditTaskModal = ({ show, onHide, taskId, onDelete }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: Number(),
    categories: [],
    start_date: '',
    end_date: '',
    user_ids: '',
    admin_id: Number(localStorage.getItem('user_id'))
  });
  
  const fetchTask = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/tasks/${taskId}`);
      setTask(response.data.task);

      //new
      if (response.data.task?.user_ids) {
        const selectedUsers = users.filter((user) => response.data.task.user_ids.includes(user.id));
        setSelectedUsers(selectedUsers);
      }

      if (response.data.task?.categories) {
        const selectedCategories = categories.filter((category) =>
          response.data.task.categories.includes(category.id)
        );
        setSelectedCategories(selectedCategories);
      }

      //
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };
  
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  console.log('task',users.map(el => {return el?.id}))
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  useEffect(() => {
    if (show) {
      fetchTask();
      fetchUsers();
      fetchCategories();
    }
  }, [show, taskId]);
  
  const toggleUser = (userId, userName) => {
    setSelectedUsers((prevUsers) =>
    prevUsers.some((user) => user.id === userId)
    ? prevUsers.filter((user) => user.id !== userId)
    : [...prevUsers, { id: userId, name: userName}]
    );
  };
  
  const toggleCategory = (categoryId, categoryName) => {
    setSelectedCategories((prevCategories) =>
    prevCategories.some((category) => category.id === categoryId)
    ? prevCategories.filter((category) => category.id !== categoryId)
    : [...prevCategories, { id: categoryId, name: categoryName }]
    );
  };

  const handleInputChange = (e) => {
    // const value = e.target.type === 'select' ? parseInt(e.target.value, 10) : e.target.value;

    // console.log('Selected value:', value);

    setTask({
      ...task,
      [e.target.name]: e.target.value,
      user_ids:selectedUsers.map(el => {return el.id}),
      categories:selectedCategories.map(el => {return el.id}),
    });
  };
  console.log('selectedUsers',selectedUsers.map(el => el.id))
  const handleUpdate = async () => {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };
    
    try {
      const response = await axios.post(`http://localhost:8000/api/tasks/update-task/${taskId}`, task, { headers: headers });
      
      if (response.status === 200) {
        Swal.fire('Task updated successfully!');
        // onHide();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error updating the task!',
        });
        console.error('Error updating task:', response.status);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error updating the task!',
      });
      console.error('Error updating task:', error);
    }
  };
  
  const handleDelete = async () => {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };
    try {
      await axios.delete(`http://localhost:8000/api/tasks/delete-task/${taskId}`, { headers: headers });
      onHide();
      onDelete(taskId);
      Swal.fire('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  return (
    <div className={`modal fade ${show ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Task</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Task Title
                </label>
                <input type="text" className="form-control" id="title" name="title" value={task.title} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Task Description
                </label>
                <textarea className="form-control" id="description" name="description" value={task.description} onChange={handleInputChange}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="start_date" className="form-label">
                  Start Date
                </label>
                <input type="date" className="form-control" id="start_date" name="start_date" value={task.start_date} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="end_date" className="form-label">
                  End Date
                </label>
                <input type="date" className="form-control" id="end_date" name="end_date" value={task.end_date} onChange={handleInputChange} />
              </div>
              <input
              className="form-control mb-4"
              type="text"
              name="users"
              placeholder="Choose from users list"
              aria-label="default input example"
              disabled
              value={selectedUsers.map((user) => user.name).join(', ')}
              onChange={(e) => setUser(e.target.value)}
            />
              <div className="mb-3">
                <label htmlFor="users" className="form-label">
                  Assign Users
                </label>
                <ul className="list-group">
                  {users.map((user) => (
                    <li
                      key={user.id}
                      className={`list-group-item ${selectedUsers.some((selectedUser) => selectedUser.id === user.id) ? 'active' : ''}`}
                      onClick={() => toggleUser(user?.id, user?.name)}
                    >
                      {user.name}
                    </li>
                  ))}
                </ul>
              </div>
              <input
              className="form-control form-control-sm mb-4"
              type="text"
              placeholder="Choose categories"
              aria-label=".form-control-sm example"
              name="categories"
              disabled
              value={selectedCategories.map((categories) => categories.name).join(', ')}
              onChange={(e) => setCategories(e.target.value)}
            />
              <div className="mb-3">
                <label htmlFor="categories" className="form-label">
                  Select Categories
                </label>
                <ul className="list-group">
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className={`list-group-item ${selectedCategories.some((selectedCategory) => selectedCategory.id === category.id) ? 'active' : ''}`}
                      onClick={() => toggleCategory(category.id, category?.name)}
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select className="form-select"id='status'name='status' onChange={handleInputChange}>
                  <option value={1}>In Progress</option>
                  <option value={2}>Completed</option>
                  <option value={3}>Canceled</option>
                </select>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                  Update Task
                </button>
                <button type="button" className="btn btn-danger gap-2" onClick={handleDelete}>
                  Delete Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;