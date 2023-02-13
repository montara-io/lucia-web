import axios from 'axios';


export function getBackendUrl({
  baseUrl = window.location.origin,
  port = window.location.port,
} = {}) {
  const withoutPort = !!port
    ? baseUrl.substring(0, baseUrl.lastIndexOf(':'))
    : baseUrl;

  return `${withoutPort}/api`;
}

const baseBackendURL = `${getBackendUrl()}`;

export async function get(url: string) {
  try {
    const response = await axios.get(`${baseBackendURL}${url}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function post(url: string, data: any) {
  try {
    const response = await axios.post(`${baseBackendURL}${url}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
