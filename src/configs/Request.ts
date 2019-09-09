import axios, { AxiosInstance } from 'axios';
import { API_CONFIG } from '@app/configs';
const axiosInstance = (): AxiosInstance => (
  axios.create({
    baseURL: API_CONFIG().URL,
    headers: {
      Accept: 'application/json',
    },
  })
);

const headers = () => ({
});

// tslint:disable-next-line: max-line-length
const getToken = () => localStorage.getItem('zone-uuid') ? localStorage.getItem('zone-uuid') : '';

const GET = (url: string, params: object = {}, isToken: boolean = false) => {
  if (isToken) {
    return axiosInstance().get(url, {
      params: {
        ...params,
        token: getToken(),
      },
      headers: {
        ...headers(),
      },
    });
  }

  return axiosInstance().get(
    url,
    {
      params,
    },
  );
};

const DELETE = (url: string, params: object = {}, isToken: boolean = false) => {
  if (isToken) {
    return axiosInstance().delete(url, {
      params: {
        ...params,
        token: getToken(),
      },
      headers: {
        ...headers(),
      },
    });
  }

  return axiosInstance().delete(url, {
    params,
  });
};

const POST = (url: string, formData: object, params: object = {}, isToken: boolean = false) => {
  if (isToken) {
    return axiosInstance().post(
      url,
      { ...formData },
      {
        params: {
          ...params,
          token: getToken(),
        },
        headers: {
          ...headers(),
        },
      });
  }

  return axiosInstance().post(
    url,
    { ...formData },
    {
      params,
    });
};

const FILE = (url: string, formData: any, params: object = {}, isToken: boolean = false) => {
  if (isToken) {
    return axiosInstance().post(
      url,
      formData,
      {
        params: {
          ...params,
          token: getToken(),
        },
        headers: {
          ...headers(),
        },
      });
  }

  return axiosInstance().post(
    url,
    formData,
    {
      params,
    });
};

const PUT = (url: string, formData: object, params: object = {}, isToken: boolean = false) => {
  if (isToken) {
    return axiosInstance().put(
      url,
      { ...formData },
      {
        params: {
          ...params,
          token: getToken(),
        },
        headers: {
          ...headers(),
        },
      });
  }

  return axiosInstance().put(
    url,
    { ...formData },
    {
      params,
    });
};

export {
  GET,
  POST,
  PUT,
  DELETE,
  getToken,
  FILE,
};
