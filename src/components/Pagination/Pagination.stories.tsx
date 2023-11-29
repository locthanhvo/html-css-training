import type { Meta, StoryObj } from '@storybook/react'
import Pagination from '.'
import '../../index.css'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const PaginationList: Story = {
  args: {
    isActiveNextIcon: true,
    isActivePreviousIcon: false,
  },
}
