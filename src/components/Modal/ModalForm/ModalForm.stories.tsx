import type { Meta, StoryObj } from '@storybook/react'
import ModalForm from '.'
import '../../../index.css'
import { STATUS, VALIDATE_MESSAGE } from '@constants'

const meta = {
  title: 'Components/ModalForm',
  component: ModalForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ModalForm>

export default meta
type Story = StoryObj<typeof meta>

export const ModalFormUser: Story = {
  args: {
    isLoading: false,
    primaryTitle: 'Add User',
    errorMessage: {
      phone: VALIDATE_MESSAGE.INVALID_PHONE,
      id: '',
      firstName: '',
      lastName: '',
      avatar: '',
      email: '',
      createdAt: '',
      status: '',
      password: '',
      confirmPassword: '',
      username: '',
    },
    title: 'Add User',
    data: {
      phone: '',
      id: '',
      firstName: '',
      lastName: '',
      avatar: '',
      email: '',
      createdAt: '',
      status: STATUS.ACTIVE,
      password: '',
      confirmPassword: '',
      username: '',
    },
  },
}
