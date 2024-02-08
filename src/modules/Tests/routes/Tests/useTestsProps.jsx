import { Box, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCreateTest, useDeleteTest, useGetTests } from 'services/api/tests/tests.service';

export const useTestsProps = () => {
  const [isOpen, setOpen] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const createTest = useCreateTest();
  const deleteTestMutation = useDeleteTest();
  const navigate = useNavigate();
  const { control, reset, handleSubmit } = useForm();

  const { fields, append, remove } = useFieldArray({
    name: 'options',
    control,
  });

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setEditing(false);
    reset();
  };

  const handleEditClick = (id) => {
    console.log(id);
  };

  const handleDeleteTest = (id) => {
    deleteTestMutation.mutate(id, {
      onSuccess: () => {
        window.location.reload();
      },
    });
  };

  const userId = 'userId';
  const tests = useGetTests({ enabled: Boolean(userId) });
  let getTestApi = tests.data?.map((user) => user);

  const columns = [
    {
      title: 'question_content',
      dataIndex: 'question_content',
      key: 'question_content',
    },
    {
      title: 'Admin',
      dataIndex: 'admin',
      key: 'admin',
      render: (item) => <span>{item?.login_name}</span>,
    },
    {
      title: 'Options',
      dataIndex: 'options',
      key: 'options',
      render: (item) => (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {item?.map((item, index) => (
            <li key={index}>{item.content}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Images',
      dataIndex: 'question_images',
      key: 'question_images',
      render: (item) => (
        <span>
          {item?.map((item, index) => (
            <img src={item} alt="" width={50} height={50} key={index} />
          ))}
        </span>
      ),
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (item) => <span>{item?.title}</span>,
    },
    {
      title: '',
      dataIndex: '',
      key: 'edit',
      render: (item) => {
        return (
          <Box>
            <Button colorScheme="orange" onClick={() => navigate(`/test/${item?.id}`)}>
              Edit
            </Button>
            <Button colorScheme="red" onClick={() => handleDeleteTest(item?.id)}>
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  let data = [];

  for (let i = 0; i < (tests.data?.length || 0); i++) {
    let test = getTestApi[i];
    let setDate = {
      admin: {
        id: test?.admin?.id || '',
        login_name: test?.admin?.login_name || '',
      },
      created_at: test?.created_at || '',
      id: test?.id ? [test.id] : [],
      options: test?.options || [],
      question_content: test?.question_content || '',
      question_images: test?.question_images || [],
      subject: {
        created_at: test?.subject?.created_at || '',
        id: test?.subject?.id || '',
        title: test?.subject?.title || '',
      },
    };

    data.push(setDate);
  }
  let access_token = localStorage.getItem('access_token');
  const headers = {
    accept: 'application/json',
    Authorization: `${access_token}`,
  };

  return {
    data,
    columns,
    isOpen,
    handleOpen,
    handleClose,
    fields,
    append,
    remove,
    navigate,

    handleSubmit,
    createTest,
    headers,
  };
};
