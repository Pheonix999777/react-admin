import { useNavigate, useParams } from 'react-router-dom';

export const useTestProps = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return {
    id,
    navigate,
  };
};
