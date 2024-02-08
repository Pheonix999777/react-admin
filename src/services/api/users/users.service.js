import { useMutation, useQuery } from 'react-query';
import request from 'services/httpRequest';
import requestPermission from 'services/httpRequest/permission';

const usersService = {
  getUsers: () => request.get('/users', {}).then((res) => res.data.data.users),
  postUser: (userData) => request.post('/users', userData, {}).then((res) => res.data.data.users),
  deleteUser: (userId) => request.delete(`/users/${userId}`).then((res) => res.data.data),
  updateUser: (userId, userData) => request.put(`/users/${userId}`, userData, {}).then((res) => res.data.data.user),
};
const usersServicePermission = {
  postPermissionId: (id, userData) => {
    return requestPermission.patch(`/${id}`, userData, {}).then((res) => res);
  },
};

// get
export const useGetUsers = ({ enabled = false }) => {
  return useQuery({
    queryKey: ['users'],
    queryFn: usersService.getUsers,
    enabled,
  });
};
// post
export const useCreateUser = () => {
  return useMutation({
    mutationFn: (userData) => usersService.postUser(userData),
    onError: (error) => {
      console.error('Error creating user:', error);
    },
  });
};
// delete
export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (userId) => usersService.deleteUser(userId),
    onError: (error) => {
      console.error('Error deleting user:', error);
    },
  });
};

// put
export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({ userId, userData }) => usersService.updateUser(userId, userData),
    onError: (error) => {
      console.error('Error updating user:', error);
    },
  });
};

export const usePostPermission = () => {
  return useMutation({
    mutationFn: (id, userData) => usersServicePermission.postPermissionId(id, userData),
    onError: (error) => {
      console.error('Error creating user:', error);
    },
  });
};
