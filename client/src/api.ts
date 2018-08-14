import axios, { AxiosInstance, AxiosError } from 'axios';
import { notify } from 'react-notify-toast';

import { StoreState } from './types';

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

type GetState = () => StoreState;

export default function api(tokenOrState: string | StoreState | GetState): AxiosInstance {
  const headers: { [key: string]: string } = {};
  // tslint:disable-next-line no-any

  let token;

  if (typeof tokenOrState === 'string') {
    token = tokenOrState;
  } else if (typeof tokenOrState === 'object' && tokenOrState.auth && tokenOrState.auth.token) {
    token = tokenOrState.auth.token;
  } else if (typeof tokenOrState === 'function') {
    token = tokenOrState().auth.token;
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios.create({ headers });
}
