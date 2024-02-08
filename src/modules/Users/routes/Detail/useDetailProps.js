import { useNavigate, useParams } from "react-router-dom";

export const useDetailProps = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  return { id, navigate };
};
