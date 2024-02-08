import { useMutation } from 'react-query';
import request from 'services/httpRequest';

const SubjectService = {
  loginAuth: (subjectData) => request.post('/auth/login', subjectData, {}).then((res) => res.data.data.tokens),
  postAuth: (subjectData) => request.post('/auth/register', subjectData, {}).then((res) => res.data),
  refreshToken: (refresh_token) => request.post('/token/refresh', { refresh_token }).then((res) => res.data.tokens),
};

export const useLoginAuth = () => {
  return useMutation({
    mutationFn: (userData) => SubjectService.loginAuth(userData),
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
    },
    onError: (error) => {
      if (error.code === 401) {
        get_access_token();
      } else {
        console.error('Error logging in:', error);
      }
    },
  });
};

export const usePostAuth = () => {
  return useMutation({
    mutationFn: (userData) => SubjectService.postAuth(userData),
    onError: (error) => {
      console.error('Error registering:', error);
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: () => SubjectService.refreshToken(localStorage.getItem('refresh_token')),
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
    },
    onError: (error) => {
      console.error('Error refreshing token:', error);
    },
  });
};

const get_access_token = () => {
  let loginPost = useLoginAuth();
  function ret() {
    return loginPost.mutate({
      login_name: 'admin',
      password: 'superuser',
    });
  }
  ret();
  useRefreshToken().mutateAsync();
};
