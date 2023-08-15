import axios from 'axios';
import { get } from 'svelte/store';

import { CustomerJWTStore } from '../contexts/customer/stores/CustomerJWTStore';

import type { InternalAxiosRequestConfig, AxiosError } from 'axios';

export const HTTPClient = axios.create({
	baseURL: (import.meta.env.VITE_BACKEND_URL as string) ?? 'http://localhost:3000/v1'
});

HTTPClient.interceptors.request.use(
	(request: InternalAxiosRequestConfig) => {
		const isAnAuthEndpoint = Boolean(request.url?.includes('auth'));
		const hasAnJWTStored = Boolean(get(CustomerJWTStore));

		if (isAnAuthEndpoint && hasAnJWTStored) {
			request.headers.Authorization = get(CustomerJWTStore);
		}

		return request;
	},
	(error: AxiosError) => error
);
