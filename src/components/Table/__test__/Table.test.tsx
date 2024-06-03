import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Flex, Td, Text } from '@chakra-ui/react';

// Components
import Table from '..';
import { Status } from '@/components';

// Constants
import { STATUS } from '@/constants';

// Icons
import { DeleteIcon, EditIcon } from '@/components/Icons';

// Mocks
import { USERS } from '@/__mocks__';

describe('Table Component', () => {
  it('Should match snapshot', () => {
    const element = render(
      <BrowserRouter>
        <Table
          columns={[
            {
              title: 'Username',
              key: 'name',
              renderBody: ({ firstName, lastName }) => (
                <Td px={0} borderColor="gray.150">
                  <Flex alignItems="center" gap="10px">
                    <Text
                      fontSize="xs"
                      color="gray.800"
                      fontWeight="regular"
                      textAlign="left"
                      whiteSpace="break-spaces"
                      noOfLines={1}
                    >
                      {firstName} {lastName}
                    </Text>
                  </Flex>
                </Td>
              ),
            },
            {
              title: 'First name',
              key: 'firstName',
            },
            {
              title: 'E-Mails',
              key: 'email',
            },
            {
              title: 'phone',
              key: 'phone',
            },
            {
              title: 'Status',
              key: 'status',
              renderBody: ({ status }) => (
                <Td px={0} borderColor="gray.150">
                  <Flex alignItems="center" gap="10px">
                    <Status variant={status as STATUS} />
                  </Flex>
                </Td>
              ),
            },
            {
              title: 'Action',
              key: 'action',
              renderBody: () => (
                <Td
                  display="flex"
                  p={10}
                  px={0}
                  textAlign="left"
                  borderColor="gray.150"
                >
                  <Flex gap={2}>
                    <DeleteIcon />
                    <EditIcon />
                  </Flex>
                </Td>
              ),
            },
          ]}
          dataSource={USERS}
        />
      </BrowserRouter>,
    );

    expect(element).toMatchSnapshot();
  });
});
