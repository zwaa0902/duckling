import request from '@utils/request';

const BASE_URL = `${import.meta.env.DCK_WISE_API_ROOT}/user`;

console.log(import.meta.env.DCK_WISE_API_ROOT);

async function getUserInfo(id: string) {
  return request.get(`${BASE_URL}/users/${id}`);
}

async function register(data: any) {
  return request.post(`${BASE_URL}/user`, data);
}

export default {
  register,
  getUserInfo,
};
