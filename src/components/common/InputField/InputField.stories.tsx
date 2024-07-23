import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

// Icons
import { ForwardArrowIcon, SearchIcon } from '@/components/common/Icons';

// Components
import InputField from '.';

const defaultProps = {
  name: 'title',
  placeholder: 'Task name or type',
  onChange: () => {},
};

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  tags: ['autodocs'],
  component: InputField,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],

  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    ...defaultProps,
    _focus: { boxShadow: 'none' },
  },
};

export const HasError: Story = {
  args: {
    ...defaultProps,
    isValidate: true,
    isError: true,
  },
};

export const SearchMinimize: Story = {
  args: {
    ...defaultProps,
    size: 'md',
    name: 'search',
    placeholder: 'Search Tasks',
    borderRadius: '2xl',
    _focus: {
      boxShadow: 'none',
      border: '1px solid',
      borderColor: 'gray.200',
    },
    boxShadow: 'sm',
  },
};

export const SearchLarge: Story = {
  args: {
    ...defaultProps,
    leftIcon: <SearchIcon />,
    rightIcon: <ForwardArrowIcon />,
    name: 'search',
    placeholder: 'Search Tasks',
    borderRadius: '2xl',
    _focus: {
      boxShadow: 'none',
      border: '1px solid',
      borderColor: 'gray.200',
    },
    boxShadow: 'md',
    size: 'lg',
  },
};
