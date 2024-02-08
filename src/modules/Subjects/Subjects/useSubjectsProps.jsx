import { Button } from '@chakra-ui/react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useDeleteSubject, useGetSubjects } from 'services/api/subjects/subjects.service';

export const useSubjectsProps = () => {
  const navigate = useNavigate();
  const deleteSubject = useDeleteSubject();
  const userId = 'userId';
  const subjects = useGetSubjects({ enabled: Boolean(userId) });
  let getSubjectsApi = subjects.data?.map((subject) => subject) || [];

  const handleDeleteSubject = (userId) => {
    deleteSubject.mutate(userId, {
      onSuccess: () => {
        window.location.reload();
      },
    });
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (item) => <span>{item ? format(new Date(item), 'dd.MM.yyyy HH:mm') : ''}</span>,
    },
    {
      title: 'Operations',
      key: 'operations',
      render: (item) => {
        return (
          <div>
            <Button colorScheme="teal" onClick={() => navigate(`/subjects/${item?.id}`)}>
              Edit
            </Button>
            <Button colorScheme="red" onClick={() => handleDeleteSubject(item?.id)}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const data = getSubjectsApi.map((subject) => ({
    id: subject.id,
    title: subject.title,
    created_at: subject.created_at,
  }));

  return {
    columns,
    data,
    navigate,
  };
};
