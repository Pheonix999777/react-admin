import { useNavigate, useParams } from 'react-router-dom';
import { useCreateSubject, useUpdateSubject } from 'services/api/subjects/subjects.service';

export const useSubjectsProps = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const createSubject = useCreateSubject();
  const updateSubject = useUpdateSubject();

  return {
    id,
    navigate,
    createSubject,
    updateSubject,
  };
};
