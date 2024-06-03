import { StoryObj, Meta } from '@storybook/react';
import { Box, Flex, Td, Text } from '@chakra-ui/react';

// Components
import Table from '.';

// Mocks
import { USERS } from '@/__mocks__';
import { DeleteIcon, EditIcon } from '../Icons';
import Status from '../Status';
import { STATUS } from '@/constants';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  tags: ['autodocs'],
  component: Table,
  render: (props) => (
    <Flex
      w="full"
      h="100vh"
      bgColor="gray.150"
      alignItems="center"
      justifyContent="center"
    >
      <Box p={8} borderRadius="lg" bgColor="primary" w="1140px">
        <Table {...props} />
      </Box>
    </Flex>
  ),
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    columns: [
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
    ],
    dataSource: USERS,
  },
};
