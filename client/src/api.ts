import axios, { AxiosInstance, AxiosError } from 'axios';
import toastr from 'toastr';

import { StoreState } from './types';

export function handleError(error: AxiosError | string) {
  if (!error) {
    return;
  }

  if (typeof error === 'string') {
    toastr.error(error);
    return;
  }

  const { response, message } = error;

  if (response) {
    const { status, data } = response;

    if (status === 500 && data && data.code === 11000) {
      toastr.warning('Název již existuje');
      return;
    }

    if (status === 401) {
      toastr.error('Nesprávný uživatel nebo heslo');
      return;
    }
  }

  if (message === 'Network Error') {
    toastr.error('Nastaly problémy s připojením');
    return;
  }

  toastr.error(message || 'Nastala neočekávaná chyba');
}

type GetState = () => StoreState;

function api(tokenOrState: string | StoreState | GetState): AxiosInstance {
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

export default api;
