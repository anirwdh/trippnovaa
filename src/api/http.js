import config, { buildApiUrl } from '../config';

const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload?.message
        ? payload.message
        : `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
};

export const publicApi = async (endpoint, options = {}) => {
  const response = await fetch(buildApiUrl(endpoint), {
    ...options,
    headers: {
      ...(options.headers || {}),
    },
  });

  return parseResponse(response);
};

export const authApi = async (endpoint, options = {}) => {
  const token = localStorage.getItem(config.AUTH_TOKEN_KEY);
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(buildApiUrl(endpoint), {
    ...options,
    headers,
  });

  return parseResponse(response);
};
