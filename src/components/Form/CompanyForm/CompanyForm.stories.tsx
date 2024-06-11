import { StoryObj, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import CompanyForm from '.';

const meta: Meta<typeof CompanyForm> = {
  title: 'Components/CompanyForm',
  tags: ['autodocs'],
  component: CompanyForm,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof CompanyForm>;

export const AddCompany: Story = {
  args: {},
};

export const EditCompany: Story = {
  args: {
    isEdit: true,
  },
};
