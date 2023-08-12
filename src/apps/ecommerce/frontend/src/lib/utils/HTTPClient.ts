import axios from 'axios';

export const HTTPClient = axios.create({
	baseURL: (import.meta.env.VITE_BACKEND_URL as string) ?? 'http://localhost:3000/v1'
});
