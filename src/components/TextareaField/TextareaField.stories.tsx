import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import TextareaField from '.';

const defaultProps = {
  name: 'email',
  placeholder: 'Email',
  onChange: () => {},
};

const meta: Meta<typeof TextareaField> = {
  title: 'Components/TextareaField',
  tags: ['autodocs'],
  component: TextareaField,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  argTypes: {
    name: {
      description: 'The name of the input field',
      defaultValue: 'email',
    },

    placeholder: {
      description: 'The placeholder for the input field',
      defaultValue: 'email',
    },

    isValidate: {
      description:
        'The validation state of the input field (the default state is false)',
    },

    isError: {
      description:
        'The error state of the input field (the default state is false)',
    },

    errorMessages: {
      description: 'The error messages of the input field',
      defaultValue: 'Default error',
    },

    label: {
      description: 'The label for the input field',
    },

    onChange: {
      description:
        'The onChange function that handles the change of the input field',
      action: 'onChange',
    },
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextareaField>;

export const Default: Story = {
  args: {
    ...defaultProps,
  },
};

export const HasError: Story = {
  args: {
    ...defaultProps,
    isValidate: true,
    isError: true,
  },
};
