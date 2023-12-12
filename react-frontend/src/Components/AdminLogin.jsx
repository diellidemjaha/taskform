import React, { useState } from 'react';
import Navbar from './NavBar';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {

  const navigate = useNavigate('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  
  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
    
  const handleSubmit = async (e) => {
      e.preventDefault();
      const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      };
  
      try {
        const response = await axios.post('http://localhost:8000/api/login-admin', formData, { headers });
  
        if (response.status === 200) {
          console.log('Login as admin successful');
          console.log('Response data:', response.data);
  
  
          const token = response.data.token;
          // const userId = response.data.user_id;
  
  
          localStorage.setItem('token', token);
          // localStorage.setItem('user_id', userId);
  
  
          window.location.href = '/tasks';
          // navigate('/tasks');

          let timerInterval;
          Swal.fire({
            title: "Authenticated !",
            html: "Login Success !",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const timer = Swal.getPopup().querySelector("b");
              timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log("I was closed by the timer");
            }
          });
  
        }
      } catch (error) {
        console.error('Login error:', error);
        console.log('Error response data:', error.response?.data);
        
        let timerInterval;
        Swal.fire({
          title: "OOPS !",
          html: "Email or Password incorrect !",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      }
    };


  return (
    <div>
      {/* <Navbar /> */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center mb-4">Login as Admin</h5>
                <form onSubmit={handleSubmit} method="POST" action="">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input type="email" className="form-control" id="email" name="email" onChange={handleChange}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handleChange} />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </form>
                <p className="text-center mt-3">
                  Don't have an account? <Link to="/admin-register">Register as Admin</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
    