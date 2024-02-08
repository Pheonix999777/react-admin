import { useMutation, useQuery } from 'react-query';
import request from 'services/httpRequest';

const SubjectService = {
  getSubjects: () => request.get('/subjects', {}).then((res) => res.data.data.subjects),
  postSubject: (subjectData) => request.post('/subjects', subjectData, {}).then((res) => res.data.data.subjects),
  deleteSubject: (subjectId) => request.delete(`/subjects/${subjectId}`).then((res) => res.data.data),
  updateSubject: (subjectId, updatedData) =>
    request.put(`/subjects/${subjectId}`, updatedData).then((res) => res.data.data.subject),
};

export const useGetSubjects = ({ enabled = false }) => {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: async () => {
      const response = await SubjectService.getSubjects();

      return response;
    },
    enabled,
  });
};

export const useCreateSubject = () => {
  return useMutation({
    mutationFn: (userData) => SubjectService.postSubject(userData),
    onError: (error) => {
      console.error('Error creating subject:', error);
    },
  });
};

export const useDeleteSubject = () => {
  return useMutation({
    mutationFn: (subjectId) => SubjectService.deleteSubject(subjectId),
    onError: (error) => {
      console.error('Error deleting subject:', error);
    },
  });
};

export const useUpdateSubject = () => {
  return useMutation({
    mutationFn: (updateData) => {
      const { subjectId, updatedData } = updateData;
      return SubjectService.updateSubject(subjectId, updatedData);
    },
    onError: (error) => {
      console.error('Error updating subject:', error);
    },
  });
};
