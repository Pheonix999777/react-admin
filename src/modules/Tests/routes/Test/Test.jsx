import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControl, Heading, Input, Select } from '@chakra-ui/react';
import { CustomModal } from 'components/CustomModal';
import axios from 'axios';
import { useGetSubjects } from 'services/api/subjects/subjects.service';
import { useTestsProps } from '../Tests/useTestsProps';
import { useParams } from 'react-router-dom';
import { useGetTests } from 'services/api/tests/tests.service';

export const Test = () => {
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

    handleSubmit,

    headers,
  } = useTestsProps();

  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };
  let { id } = useParams();

  const userId = 'userId';
  const tests = useGetSubjects({ enabled: Boolean(userId) });
  let getTestApi = Array.isArray(tests.data) ? tests.data : [];
  let subjectsArray = getTestApi.map((test) => test);

  const [content, setContent] = useState('');
  const [fieldss, setFields] = useState([]);
  const [subjectId, setSubjectId] = useState('');

  const test = useGetTests({ enabled: Boolean(userId) });
  let getTests = test.data?.find((user) => user.id === id);
  console.log(getTests);

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
      const response = await axios.put('http://54.196.215.223:8000/v1/tests/' + id, data, { headers });
      console.log('Test created successfully:', response.data);
      navigate('/test');
      window.location.reload();
    } catch (error) {
      console.error('Error creating test:', error);
    }
  };

  return (
    <Box>
      <Heading>Tests</Heading>
      <Button colorScheme="red" onClick={handleOpen}>
        Create new test
      </Button>

      <CustomModal title="Edit Test" isOpen={isOpen} callback={handleSubmit(handleCreateSubject)} onClose={handleClose}>
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
            const handleContentChange = (e) => {
              const updatedFields = [...fields];
              updatedFields[index].content = e.target.value;
              setFields(updatedFields);
            };

            const handleAnswerChange = (e) => {
              const updatedFields = [...fields];
              updatedFields[index].is_answer = e.target.checked;
              setFields(updatedFields);
            };

            return (
              <Box key={item.id}>
                <Input placeholder="Content" value={item.content} onChange={handleContentChange} />
                <Checkbox checked={item.is_answer} onChange={handleAnswerChange}>
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
