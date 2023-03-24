import axios from 'axios';

const apiBack = axios.create({
    baseURL: 'http://localhost:3001/',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default apiBack;