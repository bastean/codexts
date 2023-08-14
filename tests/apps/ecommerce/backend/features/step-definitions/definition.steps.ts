import { Given, Then, BeforeAll, AfterStep, AfterAll } from '@cucumber/cucumber';
import { request, expect } from '@playwright/test';

import type { APIResponse, APIRequestContext } from '@playwright/test';

const baseURL = process.env.BACKEND_URL;

let apiRequest: APIRequestContext;
let apiResponse: APIResponse;
let Authorization: string;

BeforeAll(async () => {
	apiRequest = await request.newContext({ baseURL });
});

AfterStep(async () => {
	if (apiResponse.headers()?.authorization !== undefined) {
		Authorization = apiResponse.headers().authorization;
		apiRequest = await request.newContext({ baseURL, extraHTTPHeaders: { Authorization } });
	}
});

Given('I send a GET request to {string}', async (endpoint: string) => {
	apiResponse = await apiRequest.get(`/v1${endpoint}`);
});

Given('I send a POST request to {string} with body:', async (endpoint: string, data: string) => {
	apiResponse = await apiRequest.post(`/v1${endpoint}`, {
		data: JSON.parse(data) as object
	});
});

Given('I send a PUT request to {string} with body:', async (endpoint: string, data: string) => {
	apiResponse = await apiRequest.put(`/v1${endpoint}`, {
		data: JSON.parse(data) as object
	});
});

Given('I send a PATCH request to {string} with body:', async (endpoint: string, data: string) => {
	apiResponse = await apiRequest.patch(`/v1${endpoint}`, {
		data: JSON.parse(data) as object
	});
});

Given('I send a DELETE request to {string} with body:', async (endpoint: string, data: string) => {
	apiResponse = await apiRequest.delete(`/v1${endpoint}`, {
		data: JSON.parse(data) as object
	});
});

Given('I do not have the required authorization token', async () => {
	apiRequest = await request.newContext({ baseURL });
});

Then('the response status code should be {int}', async (status: number) => {
	expect(apiResponse.status()).toStrictEqual(status);
});

Then('the response should be empty', async () => {
	expect(await apiResponse.text()).toStrictEqual('');
});

Then('the response content should be:', async (expected: string) => {
	const response = JSON.parse(await apiResponse.text()) as object;
	expect(response).toStrictEqual(JSON.parse(expected));
});

AfterAll(async () => {
	await apiRequest.dispose();
});
