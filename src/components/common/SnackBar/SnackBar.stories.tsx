import type { Meta, StoryObj } from '@storybook/react'
import SnackBar from '.'
import '../../index.css'

const meta = {
  title: 'Components/SnackBar',
  component: SnackBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SnackBar>

export default meta
type Story = StoryObj<typeof meta>

export const SnackBarSuccess: Story = {
  args: {
    status: 'success',
    message: 'Add User Successfully !!!',
  },
}

export const SnackBarError: Story = {
  args: {
    status: 'error',
    message: 'Add User Failed !!!',
  },
}
