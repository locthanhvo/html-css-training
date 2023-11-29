import type { Meta, StoryObj } from '@storybook/react'
import SearchInput from '.'
import '../../index.css'

const meta = {
  title: 'Components/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Search: Story = {
  args: {
    onChangeSearch() {
      console.log('Search Input Here')
    },
  },
}
