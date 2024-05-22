import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './NavBar';
import Swal from 'sweetalert2';

const Register = () => {

    const navigate = useNavigate('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/register', formData);

            if (response.status === 201) {
                console.log('Registration successful');

                let timerInterval;
                Swal.fire({
                  title: "SUCCESS !",
                  html: "Registered Successfully !",
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
                  if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                  }
                });
                // navigate('/login');
                window.location.href = '/login';

            }
        } catch (error) {
            console.error('Login error:', error);
            console.log('Error response data:', error.response?.data); 
        
            let timerInterval;
            Swal.fire({
              title: "OOPS !",
              html: "Something went wrong while registering !",
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
                                <h5 className="card-title text-center mb-4">Register as a user</h5>
                                <form onSubmit={handleSubmit} method="POST" action="">
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">
                                            Name and Lastname
                                        </label>
                                        <input type="text" className="form-control" id="username" name="name" onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input type="email" className="form-control" id="email" name="email" onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Password
                                        </label>
                                        <input type="password" className="form-control" id="password" name="password" onChange={handleChange} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Register
                                    </button>
                                </form>
                                <p className="text-center mt-3">
                                    Already have an account? <Link to="/login">Login</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
