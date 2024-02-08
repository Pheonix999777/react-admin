import { useMutation, useQuery } from 'react-query';
import request from 'services/httpRequest';

const testsService = {
  getTest: () => request.get('/tests', {}).then((res) => res.data.data.tests),
  postTest: (userData) => request.post('/tests', userData, {}).then((res) => res.data.data.tests),
  deleteTest: (userId) => request.delete(`/tests/${userId}`).then((res) => res.data.data),
};

export const useGetTests = ({ enabled = false }) => {
  return useQuery({
    queryKey: ['test'],
    queryFn: testsService.getTest,
    enabled,
  });
};

export const useCreateTest = () => {
  return useMutation({
    mutationFn: (userData) => testsService.postTest(userData),
    onError: (error) => {
      console.error('Error creating Test:', error);
    },
  });
};

export const useDeleteTest = () => {
  return useMutation({
    mutationFn: (userId) => testsService.deleteTest(userId),
    onError: (error) => {
      console.error('Error deleting Test:', error);
    },
  });
};
