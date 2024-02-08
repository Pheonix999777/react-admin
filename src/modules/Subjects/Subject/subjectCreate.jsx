import { Button, FormControl, Heading, Input, FormErrorMessage } from '@chakra-ui/react';
import { useSubjectsProps } from './useSubjectProps';
import { useState } from 'react';

export const SubjectCreate = () => {
  const { navigate, createSubject } = useSubjectsProps();
  const [title, setTitle] = useState('');

  const isTitleValid = title.length >= 6;

  const handleCreateSubject = () => {
    createSubject.mutate(
      {
        title: title,
      },
      {
        onSuccess: () => {
          navigate('/subjects');
          window.location.reload();
        },
      },
    );
  };
  return (
    <div>
      <Heading>Create new subject</Heading>
      <Button onClick={() => navigate('/subjects')}>Back</Button>
      <FormControl as="form">
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Button type="button" onClick={handleCreateSubject}>
          Create New Subject
        </Button>
      </FormControl>
    </div>
  );
};
