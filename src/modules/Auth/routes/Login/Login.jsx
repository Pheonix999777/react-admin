import { Box, Button, FormControl, Heading, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useLoginProps } from './useLoginProps';
import { useState } from 'react';
import { useGetUsers } from 'api';

export const Login = () => {
  const { show, handleClick, onSubmit, handleSubmit, loginPost, navigate } = useLoginProps();

  const [login_name, setLogin_name] = useState('');
  const [password, setPassword] = useState('');

  const userId = 'userId';
  const users = useGetUsers({ enabled: Boolean(userId) });
  const usersData = users.data?.find((user) => user.login_name == login_name);

  const handleCreateSubject = async () => {
    loginPost.mutate(
      {
        login_name: login_name,
        password: password,
      },
      {
        onSuccess: async () => {
          let type = usersData.type;
          let permission = usersData.has_permission;
          localStorage.setItem('has_permission', permission);
          localStorage.setItem('role', type);
          window.location.reload();
          console.log('success');
        },
        onError: () => {
          console.log('error not found user');
        },
      },
    );
  };

  return (
    <Box>
      <FormControl onSubmit={handleSubmit(onSubmit)} as="form">
        <Heading textAlign="center" mb={2}>
          Login
        </Heading>
        <Box display="flex" flexDirection="column" gap={3} maxWidth="400px" margin="0 auto">
          <Input
            type="text"
            placeholder="Enter user"
            value={login_name}
            onChange={(e) => setLogin_name(e.target.value)}
            required="ture"
          />
          <InputGroup size="md">
            <Input
              value={password}
              type={show ? 'text' : 'password'}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required="ture"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button type="submit" onClick={handleCreateSubject}>
            Submit
          </Button>
        </Box>
      </FormControl>
      <Box display="flex" justifyContent="center" color="dodgerblue">
        <Link to="/auth/register">register</Link>
      </Box>
    </Box>
  );
};
