import type { Meta, StoryObj } from '@storybook/react'
import Filter from '.'
import '../../index.css'

const meta = {
  title: 'Components/Filter',
  component: Filter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Filter>

export default meta
type Story = StoryObj<typeof meta>

export const FilterQuery: Story = {}
