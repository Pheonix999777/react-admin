import { Button, FormControl, Input } from '@chakra-ui/react';
import { useDetailProps } from './useDetailProps';
import { useGetUsers, useUpdateUser } from 'api';
import { useEffect, useState } from 'react';

export const Detail = () => {
  const { id, navigate } = useDetailProps();

  const [login_name, setLogin_name] = useState('');

  // Get the mutate function from useUpdateUser
  const updateUserMutation = useUpdateUser();

  const handleUpdateUser = () => {
    // Use the mutate function to trigger the mutation
    updateUserMutation.mutate(
      { userId: id, userData: { login_name } },
      {
        onSuccess: () => {
          // Refetch the data after a successful update
          users.refetch();
          navigate('/users');
          console.log('true');
        },
      },
    );
  };

  const userId = 'userId';
  const users = useGetUsers({ enabled: Boolean(userId) });

  let getUsersApi = users.data?.find((user) => user.id === id);

  useEffect(() => {
    if (getUsersApi) {
      setLogin_name(getUsersApi.login_name);
    }
  }, [getUsersApi]);

  const handleChange = (e) => {
    setLogin_name(e.target.value);
  };

  return (
    <div>
      <Button onClick={() => navigate('/users')}>Back</Button>
      <h1>User id: {id}</h1>
      <FormControl as="form">
        <Input type="text" value={login_name} onChange={handleChange} />
        <Button type="button" onClick={handleUpdateUser}>
          Save
        </Button>
      </FormControl>
    </div>
  );
};
