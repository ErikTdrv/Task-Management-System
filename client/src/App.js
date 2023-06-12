import logo from './logo.svg';
import './App.css';
import Register from './components/Authentication/Register';
import Login from './components/Authentication/Login';
import { Routes, Route } from 'react-router-dom';
import InitialPage from './components/InitialPage/InitialPage';
import Home from './components/Home/Home';
import CreateTask from './components/CreateTask/CreateTask';
import CompletedTasks from './components/CompletedTasks/CompletedTasks';

function App() {

  return (
    <Routes>
      <Route exact path="/" element={<InitialPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/add-task" element={<CreateTask />} />
      <Route path="/add-task/:taskId" element={<CreateTask mode={'edit'}/>} />
      <Route path="/completed-tasks" element={<CompletedTasks/>} />

    </Routes>
  );
}

export default App;
