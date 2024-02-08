import { Button, FormControl, Input } from '@chakra-ui/react';
import { useSubjectsProps } from './useSubjectProps';
import { useGetSubjects, useUpdateSubject } from 'services/api/subjects/subjects.service';
import { useState, useEffect } from 'react';

export const Subject = () => {
  const { id, navigate } = useSubjectsProps();
  const updateSubject = useUpdateSubject();

  const [title, setTitle] = useState('');

  const handleUpdateSubject = () => {
    updateSubject.mutate(
      { subjectId: id, updatedData: { title } },
      {
        onSuccess: () => {
          subjects.refetch();
          navigate('/subjects');
        },
      },
    );
  };

  const userId = 'userId';
  const subjects = useGetSubjects({ enabled: Boolean(userId) });
  const getSubjectsApi = subjects.data?.find((subject) => subject.id === id);

  useEffect(() => {
    if (getSubjectsApi) {
      setTitle(getSubjectsApi.title);
    }
  }, [getSubjectsApi]);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <h1>Subject id: {id}</h1>
      <Button onClick={() => navigate('/subjects')}>Back</Button>
      <span>Created at: {getSubjectsApi?.created_at}</span>
      <FormControl as="form">
        <Input placeholder="Title" value={title} onChange={handleChange} />

        <Button type="button" onClick={handleUpdateSubject}>
          Save
        </Button>
      </FormControl>
    </div>
  );
};
