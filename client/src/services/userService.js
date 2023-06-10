const API_URL = 'http://localhost:7070';

export const register = async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }, 
        credentials: 'include',
        body: JSON.stringify(userData)
    });
    if(response.ok){
        const data = await response.json();
        return data
    }
}
export const convertToBase64 = async (file) => {

    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
  
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }