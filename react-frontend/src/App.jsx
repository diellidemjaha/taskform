import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./Components/NavBar.jsx";
import Tasks from "./Components/Tasks.jsx";
import Task from "./Components/Task.jsx";
import LandingPage from "./Components/LandingPage.jsx";
import Register from "./Components/Register.jsx";
import Login from "./Components/Login.jsx";
import AdminLogin from "./Components/AdminLogin.jsx";
import AdminRegister from "./Components/AdminRegister.jsx";

function App() {

  let logged_in = localStorage.getItem('token');

  // const [helloWorld, setHelloWorld] = useState([]);

  // useEffect(() => {
  //   async function fetchHelloWorld() {
  //     try {
  //       const response = await axios.get(`http://127.0.0.1:8000/api/hello-world`); // GET request
  //       setHelloWorld(response.data.Test);
  //     } catch (error) {
  //       console.error('Error fetching hello world:', error);
  //     }
  //   }
  //   fetchHelloWorld();
  // }, []);
  
  return (
  
<Router>
<Navbar />
    <Routes>
        <Route path="/" element={logged_in == null ? <LandingPage /> : <Login/>} />
        <Route path="/tasks" element={logged_in == null ? <Login /> : <Tasks />} />
        <Route path="/new-task" element={logged_in == null ? <Login /> : <Task />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />

    </Routes>
</Router>
  );
}

export default App
