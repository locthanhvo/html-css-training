import type { Meta, StoryObj } from "@storybook/react";
import ModalConfirm from ".";
import "../../../index.css";

const meta = {
  title: "Components/ModalConfirm",
  component: ModalConfirm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ModalConfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ModalConfirmUser: Story = {
  args: {
    isLoading: false,
    message: "Are you sure you want to delete this user?",
    title: "Confirm",
  },
};
