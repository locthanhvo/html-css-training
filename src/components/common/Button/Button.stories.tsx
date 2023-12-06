import type { Meta, StoryObj } from "@storybook/react";
import { ReactComponent as AddIcon } from "@assets/icons/add-icon.svg";
import Button from ".";
import "../../../index.css";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonPrimary: Story = {
  args: {
    children: (
      <>
        <h2>Add User</h2>
        <AddIcon />
      </>
    ),
    variants: "primary",
    onClick() {
      console.log("Button Add User");
    },
  },
};

export const ButtonSecondary: Story = {
  args: {
    children: (
      <>
        <AddIcon />
        <h2>Edit User</h2>
      </>
    ),
    variants: "secondary",
    onClick() {
      console.log("Button Add User");
    },
  },
};
