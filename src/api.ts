import axios, { AxiosInstance, AxiosError } from 'axios';
import { notify } from 'react-notify-toast';

import { getAuthToken } from './clientAuth';

export function handleError(error: AxiosError | string) {
  if (!error) {
    return;
  }

  if (typeof error === 'string') {
    notify.show(error, 'error');
    return;
  }

  const { response, message } = error;

  if (response) {
    const { status, data } = response;

    if (status === 500 && data && data.code === 11000) {
      notify.show('Název již existuje', 'error');
      return;
    }

    if (status === 401) {
      notify.show('Nesprávný uživatel nebo heslo', 'error');
      return;
    }
  }

  if (message === 'Network Error') {
    notify.show('Nastaly problémy s připojením', 'error');
    return;
  }

  notify.show(message || 'Nastala neočekávaná chyba', 'error');
}

export default function api(): AxiosInstance {
  const headers: { [key: string]: string } = {};
  const token = getAuthToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios.create({ headers });
}
