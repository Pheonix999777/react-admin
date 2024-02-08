import { CustomTable } from 'components/CustomTable';
import { useSubjectsProps } from './useSubjectsProps';
import { Box, Button, FormControl, Heading, Input } from '@chakra-ui/react';

export const Subjects = () => {
  const { columns, data, navigate } = useSubjectsProps();

  return (
    <Box>
      <Box display="flex">
        <Heading mr={8}>Subjects</Heading>
        <Button colorScheme="red" mt={2} mb={2} onClick={() => navigate(`create`)}>
          Create New Subjects
        </Button>
      </Box>

      <CustomTable columns={columns} data={data} />
    </Box>
  );
};
