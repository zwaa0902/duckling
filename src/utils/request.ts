import _ from 'lodash';
import axios from 'axios';
import secureStorage from 'react-secure-storage';
import { v4 as uuidv4 } from 'uuid';


let authInterceptors: number;

// // Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return _.has(response, 'data') ? response.data : response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      // const authState = store.getState();
      if (!['/login', '/register'].includes(window.location.pathname)) {
        // refreshToken(token);
        // window.location.pathname = '/login';
      }
    }
    return Promise.reject({ ...error?.response?.data, statusCode: error?.response?.status });
  },
);

function getDeviceId() {
  const DEVICE_ID_STORAGE_KEY = 'deviceId';
  let id: string = secureStorage.getItem(DEVICE_ID_STORAGE_KEY) as string;
  if (id == null || id.trim() == '') {
    id = uuidv4();
    secureStorage.setItem(DEVICE_ID_STORAGE_KEY, id);
  }
  return id;
}

// start request
async function get(url: string, params = {}, config = {}) {
  return axios({
    method: 'GET',
    url,
    ...config,
    params,
    // trick for disable auto remove content-type headers of Axios
    data: {},
  });
}

async function post(url: string, payload = {}, config = {}) {
  return axios({
    method: 'POST',
    url: encodeURI(url),
    ...config,
    data: payload,
  });
}

async function patch(url: string, payload = {}, config = {}) {
  return axios({
    method: 'PATCH',
    url,
    ...config,
    data: payload,
  });
}

async function put(url: string, payload = {}, config = {}) {
  return axios({
    method: 'PUT',
    url,
    ...config,
    data: payload,
  });
}

async function del(url: string, payload = {}, config = {}) {
  return axios({
    method: 'DELETE',
    url,
    ...config,
    data: payload,
  });
}

// end request

// Add device id interceptor
axios.interceptors.request.use(
  (config) => {
    config.headers['x-device-id'] = getDeviceId();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a request interceptor
function configAuthRequestToken(token: string) {
  authInterceptors = axios.interceptors.request.use(
    (config) => {
      if (_.isEmpty(config.headers.Authorization)) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
}

function removeAuthRequestToken() {
  axios.interceptors.request.eject(authInterceptors);
}



export default {
  get,
  post,
  patch,
  put,
  del,
  configAuthRequestToken,
  removeAuthRequestToken,
  getDeviceId,
};
