import axios from 'axios';


const api = axios.create({
    baseURL: 'https://28de-186-30-27-232.ngrok-free.app',
    headers: {"ngrok-skip-browser-warning":"69420"}
})

export const getTasks = () => api.get('/api/tasks');
export const addTask = (task) => api.post('/api/tasks', task);
export const updateTask = (id, task) => api.put(`/api/tasks/${id}`, task);
export const deleteTask = (id) => api.delete(`/api/tasks/${id}`);