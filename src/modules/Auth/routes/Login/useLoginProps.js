import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginAuth } from 'services/api/auth/auth.service';

export const useLoginProps = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const loginPost = useLoginAuth();
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
    loginPost,
    navigate,
  };
};
