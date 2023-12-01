import type { Meta, StoryObj } from '@storybook/react'
import Checkbox from '.'
import '../../index.css'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const CheckboxButton: Story = {
  args: { checkboxId: '1' },
}
