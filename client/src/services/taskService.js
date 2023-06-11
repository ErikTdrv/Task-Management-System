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