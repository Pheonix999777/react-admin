import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { usePostAuth } from 'services/api/auth/auth.service';

export const useRegisterProps = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const createAuth = usePostAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
  };

  return {
    handleClick,
    show,
    register,
    handleSubmit,
    onSubmit,
    createAuth,
    navigate,
  };
};
