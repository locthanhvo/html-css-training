import type { Meta, StoryObj } from '@storybook/react'
import TableHeader from '.'
import SortIcon from '@components/Icons/SortIcon'
import '../../../index.css'

const meta = {
  title: 'Components/Table/TableHeader',
  component: TableHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TableHeader>

export default meta
type Story = StoryObj<typeof meta>

export const TableHeaderUser: Story = {
  args: {
    columns: [
      { headerName: 'Users', icon: <SortIcon />, width: 'lg' },
      { headerName: 'Status', width: 'md' },
      { headerName: 'E-mail', width: 'lg' },
      { headerName: 'Date', width: 'xl' },
      { headerName: 'Actions', width: 'xl' },
    ],
  },
}
