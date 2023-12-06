import type { Meta, StoryObj } from "@storybook/react";
import Heading from ".";
import "../../../index.css";

const meta = {
  title: "Components/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeadingH1: Story = {
  args: {
    tag: "h1",
    content: "Team members",
  },
};

export const HeadingH2: Story = {
  args: {
    tag: "h2",
    content: "Add User",
  },
};
