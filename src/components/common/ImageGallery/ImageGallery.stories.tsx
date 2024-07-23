import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import ImageGallery from '.';

export default {
  title: 'Components/ImageGallery',
  component: ImageGallery,
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
} as Meta;

type Story = StoryObj<typeof ImageGallery>;

export const Default: Story = {
  args: {
    previewURL: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
  },
};
