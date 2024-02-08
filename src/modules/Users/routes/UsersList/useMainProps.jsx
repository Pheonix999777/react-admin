import { Button } from '@chakra-ui/react';
import { useCreateUser, useDeleteUser, useGetUsers, usePostPermission } from 'api';
import { format } from 'date-fns';

import { useNavigate } from 'react-router-dom';

export const useMainProps = () => {
  const navigate = useNavigate();
  const postPer = usePostPermission();
  const deleteUserMutation = useDeleteUser();

  const handleDeleteUser = (userId) => {
    deleteUserMutation.mutate(userId, {
      onSuccess: () => {
        window.location.reload();
      },
    });
  };

  const handleGivePermission = (userId) => {
    postPer.mutate(userId, {
      onSuccess: () => {
        window.location.reload();
      },
    });
  };

  const userId = 'userId';
  const users = useGetUsers({ enabled: Boolean(userId) });
  let getUsersApi = users.data?.map((user) => user);

  const columns = [
    {
      title: 'Login',
      dataIndex: 'login_name',
      key: 'name',
      width: 100,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 100,
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 200,
      render: (item) => <span>{item ? format(new Date(item), 'dd.MM.yyyy HH:mm') : ''}</span>,
    },
    {
      title: 'Has permission',
      dataIndex: 'has_permission',
      key: 'has_permission',
      render: (item) => (item == 'true' ? 'Yes' : 'No'),
    },
    {
      title: 'Operations',
      key: 'operations',
      render: (item) => {
        return (
          <div>
            <Button
              colorScheme={item?.has_permission ? 'linkedin' : 'green'}
              onClick={() => handleGivePermission(item?.id)}
              isDisabled={item?.has_permission == 'true'}
            >
              {item?.has_permission == 'true' ? 'access is allowed' : 'give access'}
            </Button>
            <Button colorScheme="teal" onClick={() => navigate(`/users/${item?.id}`)}>
              Edit
            </Button>
            <Button colorScheme="red" onClick={() => handleDeleteUser(item?.id)}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  let data = [];

  for (let i = 0; i < (users.data?.length || 0); i++) {
    let login_name = getUsersApi[i].login_name;
    let type = getUsersApi[i].type;
    let has_permission = getUsersApi[i].has_permission;
    let id = getUsersApi[i].id;
    let created_at = getUsersApi[i].created_at;

    let setDate = {
      created_at: [created_at],
      has_permission: [has_permission],
      id: [id],
      login_name: [login_name],
      type: [type],
    };

    data.push(setDate);
  }
  return {
    columns,
    data,
  };
};
