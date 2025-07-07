import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'https://apiprodv2.entekas.com/api/v1/';

const responseBody = <T,>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T,>(url: string) =>
    axios.get<T>(url).then((res) => {
      return responseBody(res);
    }),
  getHeader: <T,>(url: string, bearer: string) =>
    axios.get<T>(url, { headers: { 'Authorization': 'Bearer ' + bearer } }).then((res) => {
        return responseBody(res);
      }),

  post: <T,>(url: string, body: object) =>
    axios.post<T>(url, body).then((res) => {
      return responseBody(res);
    }),

  postHeader: <T,>(url: string, body: object, bearer: string) =>
    axios.post<T>(url, body, { headers: { 'Authorization': 'Bearer ' + bearer } })
      .then((res) => {
        return responseBody(res);
      })
      .catch((err) => {
        throw err;
      }),

  put: <T,>(url: string, body: object) =>
    axios.put<T>(url, body).then((res) => {
      return responseBody(res);
    }),

  putHeader: <T,>(url: string, body: object, bearer: string) =>
    axios.put<T>(url, body, { headers: { 'Authorization': 'Bearer ' + bearer } })
      .then((res) => {
        return responseBody(res);
      })
      .catch((err) => {
        throw err;
      }),

  del: <T,>(url: string) =>
    axios.delete<T>(url).then((res) => {
      return responseBody(res);
    }),

  delHeader: <T,>(url: string, bearer: string) =>
    axios.delete<T>(url, { headers: { 'Authorization': 'Bearer ' + bearer } })
      .then((res) => {
        return responseBody(res);
      })
      .catch((err) => {
        throw err;
      }),
};

const useRequest = {
  requests,
};

export default useRequest;
