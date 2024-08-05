import request from '@utils/request';

const BASE_URL = `${import.meta.env.DCK_WISE_API_ROOT}`;

async function getGroupById(id: string) {
  return request.get(`${BASE_URL}/${id}/groups`);
}

async function create(data: any) {
  return request.post(`${BASE_URL}/groups`, data);
}

export default {
  getGroupById,
  create,
};
