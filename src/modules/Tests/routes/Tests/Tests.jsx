import React, { useState } from 'react';
import { CustomTable } from 'components/CustomTable';
import { useTestsProps } from './useTestsProps';
import { Box, Button, Checkbox, FormControl, Heading, Input, Select } from '@chakra-ui/react';
import { CustomModal } from 'components/CustomModal';

import { useGetSubjects } from 'services/api/subjects/subjects.service';
import request from 'services/httpRequest';

export const Tests = () => {
  const {
    columns,
    data,
    isOpen,
    handleOpen,
    handleClose,
    remove,
    append,
    fields,
    navigate,
    onSubmit,
    handleSubmit,
    createTest,
    headers,
  } = useTestsProps();

  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const userId = 'userId';
  const tests = useGetSubjects({ enabled: Boolean(userId) });
  let getTestApi = Array.isArray(tests.data) ? tests.data : [];
  let subjectsArray = getTestApi.map((test) => test);

  const [content, setContent] = useState('');
  const [fieldss, setFields] = useState([]);
  const [subjectId, setSubjectId] = useState('');

  const handleCreateSubject = async () => {
    const options = fields.map((field) => ({
      content: field.content,
      is_answer: field.is_answer,
    }));

    const data = {
      options,
      question_content: content,
      question_images: [selectedImage ? selectedImage.name : ''],
      subject_id: subjectId,
    };

    try {
      const response = await request.post('/tests', data);
      console.log('Test created successfully:', response.data);
      navigate('/test');
      window.location.reload();
    } catch (error) {
      console.error('Error creating test:', error);
    }
  };

  const handleContentChange = (index) => (e) => {
    const updatedFields = [...fields];
    updatedFields[index].content = e.target.value;
    setFields(updatedFields);
  };

  const handleAnswerChange = (index) => (e) => {
    const updatedFields = [...fields];
    updatedFields[index].is_answer = e.target.checked;
    setFields(updatedFields);
  };

  console.log(selectedImage);
  return (
    <Box>
      <Heading>Tests</Heading>
      <Button colorScheme="red" onClick={handleOpen}>
        Create new test
      </Button>
      <CustomTable columns={columns} data={data} />
      <CustomModal
        title="Create new test"
        isOpen={isOpen}
        callback={handleSubmit(handleCreateSubject)}
        onClose={handleClose}
      >
        <FormControl as="form">
          <Input placeholder="Title" value={content} onChange={(e) => setContent(e.target.value)} />
          <input type="file" name="file" onChange={handleImageChange} />
          <button>save</button>
          <Heading fontSize="14px">Subject</Heading>
          <Select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
            {subjectsArray.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.title}
              </option>
            ))}
          </Select>
          <Heading fontSize="14px">Variants</Heading>
          {fields.map((item, index) => {
            return (
              <Box key={item.id}>
                <Input placeholder="Content" value={item.content} onChange={handleContentChange(index)} />
                <Checkbox checked={item.is_answer} onChange={handleAnswerChange(index)}>
                  Is current answer
                </Checkbox>
                <Button colorScheme="red" fontSize="10" onClick={() => remove(index)}>
                  Delete
                </Button>
              </Box>
            );
          })}

          <Button
            colorScheme="telegram"
            onClick={() =>
              append({
                content: '',
                is_answer: false,
              })
            }
          >
            Add variant
          </Button>
        </FormControl>
      </CustomModal>
    </Box>
  );
};
