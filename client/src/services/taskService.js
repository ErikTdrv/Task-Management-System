const API_URL = 'http://localhost:7070';

const addTask = async (task) => {
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