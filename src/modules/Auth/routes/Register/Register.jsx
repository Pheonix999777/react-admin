import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useStatStyles,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useRegisterProps } from './useRegisterProps';
import { useState } from 'react';
import { authStore } from 'store/auth.store';

export const Register = () => {
  const { show, handleClick, onSubmit, handleSubmit, register, createAuth, navigate } = useRegisterProps();

  const [login_name, setLogin_name] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateSubject = () => {
    createAuth.mutate(
      {
        login_name: login_name,
        password: password,
      },
      {
        onSuccess: () => {
          console.log('Successfully registered');
          navigate('/login');
        },
      },
    );
  };

  return (
    <Box>
      <FormControl onSubmit={handleSubmit(onSubmit)} as="form">
        <Heading textAlign="center" mb={2}>
          Register
        </Heading>
        <Box display="flex" flexDirection="column" gap={3} maxWidth="400px" margin="0 auto">
          <Input
            type="text"
            placeholder="Enter user name"
            value={login_name}
            onChange={(e) => setLogin_name(e.target.value)}
            required="ture"
          />
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? 'text' : 'password'}
              value={password}
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
        <Link to="/auth/login">login</Link>
      </Box>
    </Box>
  );
};
