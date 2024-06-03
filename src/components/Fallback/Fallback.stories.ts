import type { Meta, StoryObj } from '@storybook/react'
import Component from '.'

const meta = {
  title: 'Components/FallBack',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
