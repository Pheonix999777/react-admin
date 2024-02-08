import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useCustomersProps } from './CustomersProps';
import cls from './styles.module.scss';
import { Select } from '@chakra-ui/react';

export const Customers = () => {
  const { subjects, getSubjectsApi, access_token } = useCustomersProps();
  const [subject, setSubject] = useState('');
  const [data, setData] = useState([]);
  const [checkedOptions, setCheckedOptions] = useState({});

  useEffect(() => {
    const fetchTests = async () => {
      try {
        if (subject) {
          const response = await axios.get(`http://54.196.215.223:8000/v1/tests?subject_id=${subject}`, {
            headers: {
              Authorization: `${access_token}`,
              Accept: 'application/json',
            },
          });

          setData(response.data.data.tests);
        }
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    fetchTests();
  }, [subject]);

  const handleCheckboxChange = (optionId) => {
    setCheckedOptions({
      ...checkedOptions,
      [optionId]: !checkedOptions[optionId],
    });
  };

  return (
    <div className={cls.div}>
      <Select className={cls.section} value={subject} onChange={(e) => setSubject(e.target.value)}>
        {getSubjectsApi.map((subject) => (
          <option value={subject.id} key={subject.id}>
            {subject.title}
          </option>
        ))}
      </Select>
      <ul className={cls.ul}>
        {data.map((test) => (
          <li key={test.options}>
            <p>Question: {test.question_content}</p>
            <ul className={cls.ul}>
              {test.options.map((option, index) => (
                <li className={cls.li} key={index}>
                  {option.content}
                  <input
                    className={cls.checkbox}
                    type="checkbox"
                    checked={checkedOptions[option.id]}
                    onChange={() => handleCheckboxChange(option.id)}
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
