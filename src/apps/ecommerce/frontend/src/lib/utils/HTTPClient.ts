import axios from 'axios';

const HTTPClient = axios.create({
	baseURL: (import.meta.env.VITE_BACKEND_URL as string) ?? 'http://localhost:3000/v1'
});

// Query's
export const get = async (url: string) => HTTPClient.get(url);
export const post = async (url: string, data: object) => HTTPClient.post(url, data);

// Commands
export const put = async (url: string, data: object) => HTTPClient.put(url, data);
export const patch = async (url: string, data: object) => HTTPClient.patch(url, data);
export const del = async (url: string) => HTTPClient.delete(url);
