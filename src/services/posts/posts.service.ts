import ENDPOINTS from '../../constants/endpoints';
import requestMockApi from '../../utils/axios';

export const getPosts = async (): Promise<object> => {
  const { data } = await requestMockApi.get(ENDPOINTS.POSTS);
  return data;
};
