import type { Meta, StoryObj } from '@storybook/react'
import Avatar from '.'
import '../../index.css'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const AvatarNameUser: Story = {
  args: {
    firstName: 'Loc',
    lastName: 'Vo',
  },
}

export const AvatarImageUser: Story = {
  args: {
    url: 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png',
    name: 'Loc Vo',
    firstName: 'Loc',
    lastName: 'Vo',
  },
}
