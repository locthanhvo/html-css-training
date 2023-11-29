import type { Meta, StoryObj } from '@storybook/react'
import TableRow from '.'
import '../../../index.css'
import { STATUS } from '@constants'

const meta = {
  title: 'Components/Table/TableRow',
  component: TableRow,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TableRow>

export default meta
type Story = StoryObj<typeof meta>

export const TableRowUser: Story = {
  args: {
    data: {
      id: '1',
      firstName: 'Loc',
      lastName: 'Vo',
      avatar: '',
      email: 'loc.vo@asnet.com.vn',
      createdAt: '2023-10-18T07:06:46.929Z',
      status: STATUS.ACTIVE,
      password: '12312321',
      confirmPassword: '123213213',
      username: 'locvo',
      phone: '091293871',
    },
  },
}
