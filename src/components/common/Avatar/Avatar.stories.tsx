import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import AvatarSmallUrl from '@/assets/images/avatar-small-mary-alex.webp';
import AvatarMediumUrl from '@/assets/images/avatar-medium-paul-doe.webp';
import AvatarLargeUrl from '@/assets/images/avatar-large-paul-doe.webp';

// Components
import Avatar from '.';

export default {
  title: 'Components/Avatar',
  component: Avatar,
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

type Story = StoryObj<typeof Avatar>;

export const AvatarSmall: Story = {
  args: {
    url: AvatarSmallUrl,
  },
};

export const AvatarMedium: Story = {
  args: {
    url: AvatarMediumUrl,
    w: 50,
    h: 50,
  },
};

export const AvatarLarge: Story = {
  args: {
    url: AvatarLargeUrl,
    w: 110,
    h: 110,
  },
};
