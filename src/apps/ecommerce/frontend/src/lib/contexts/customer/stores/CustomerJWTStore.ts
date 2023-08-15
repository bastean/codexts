import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

const key = 'codexts-jwt';

export const CustomerJWTStore = persist(writable<string | null>(null), createLocalStorage(), key);
