import request from '@utils/request';

const BASE_URL = `${import.meta.env.WISE_API_ROOT}/user`;

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