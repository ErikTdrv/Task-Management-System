const API_URL = 'http://localhost:7070';

export const addTask = async (task) => {
  const response = await fetch(`${API_URL}/add-task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(task)
  });
  return await response.json();
}
export const getAllTasks = async () => {
  const response = await fetch(`${API_URL}/all-tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  });
  return await response.json();
}
export const getOneTask = async (taskId) => {
  const response = await fetch(`${API_URL}/task/${taskId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  });
  return await response.json();
}
export const editTask = async (task) => {
  const response = await fetch(`${API_URL}/task/${task._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(task)
  });
  return await response.json();
}
export const calculateTime = (task, setTimeLeft, setHasPassedTime) => {
  const targetDate = new Date(`${task.date}T${task.hours}:${task.minutes}:00`);
  const now = new Date();

  const timeDifference = targetDate - now;

  if (timeDifference > 0) {
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    if (days > 1) {
      setTimeLeft(`${days}d ${hours}h`);
    } else if (days == 0 && hours > 1) {
      setTimeLeft(`${hours}h ${minutes}m`);
    } else if (days == 0 && hours < 1) {
      setTimeLeft(`${minutes}m`);
    }
    setHasPassedTime(false)
  } else {
    setTimeLeft('Time has passed!');
    setHasPassedTime(true)
  }
}
export const dataTimeValidation = (taskData, setTaskData, setMainError) => {
  const date = new Date(); // Assuming you have a Date object

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  if (taskData.minutes == '') {
    setTaskData({ ...taskData, minutes: '00' })
  } else if (taskData.hours == '') {
    setTaskData({ ...taskData, hours: '00' })
  } else {
    setMainError('You must enter Hours or Minutes!')
  }
  if (taskData.date == '' && (taskData.minutes != '' || taskData.hours != '')) {
    setTaskData({ ...taskData, date: formattedDate })
  } else {
    setMainError('You must enter Hours or Minutes!')
  }
}