import axios from 'axios';

const baseURL = window.__RUNTIME_CONFIG__.REACT_APP_BACKEND_URL;

export async function get(url: string) {
  try {
    const response = await axios.get(`${baseURL}${url}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function post(url: string, data: any) {
  try {
    const response = await axios.post(`${baseURL}${url}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
