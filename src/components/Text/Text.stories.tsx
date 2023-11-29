import type { Meta, StoryObj } from '@storybook/react'
import Text from '.'
import '../../index.css'

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const TextEmail: Story = {
  args: {
    content: 'jessica.hanson@example.com',
    color: 'black',
    fontSize: '2sm',
    fontWeight: 'regular',
  },
}

export const TextFirstName: Story = {
  args: {
    content: '@jane',
    color: 'grey-dark',
    fontSize: '2sm',
    fontWeight: 'regular',
  },
}
