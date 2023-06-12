import logo from './logo.svg';
import './App.css';
import Register from './components/Authentication/Register';
import Login from './components/Authentication/Login';
import { Routes, Route, useNavigate } from 'react-router-dom';
import InitialPage from './components/InitialPage/InitialPage';
import Home from './components/Home/Home';
import CreateTask from './components/CreateTask/CreateTask';
import CompletedTasks from './components/CompletedTasks/CompletedTasks';
import { useEffect } from 'react';
import { getUser } from './services/userService';
import { useDispatch } from 'react-redux';
import Profile from './components/Profile/Profile';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    async function gettingUser() {
      const user = await getUser();
      if (user?._id) {
        navigate('/home');
        dispatch({ type: "SET_USER", payload: user });
      } else {
        dispatch({ type: "SET_USER", payload: null });
      }
    }
    gettingUser();
  }, [])
  return (
    <Routes>
      <Route exact path="/" element={<InitialPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/add-task" element={<CreateTask />} />
      <Route path="/add-task/:taskId" element={<CreateTask mode={'edit'} />} />
      <Route path="/completed-tasks" element={<CompletedTasks />} />
      <Route path="/profile" element={<Profile />} />

    </Routes>
  );
}

export default App;
