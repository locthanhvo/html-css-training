import type { Meta, StoryObj } from "@storybook/react";
import InputGroup from ".";
import "../../../index.css";
import { VALIDATE_MESSAGE } from "@constants";

const meta = {
  title: "Components/InputGroup",
  component: InputGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputGroupUser: Story = {
  args: {
    name: "firstName",
    placeholder: "First Name *",
    type: "text",
    value: "",
    errorMessageField: VALIDATE_MESSAGE.REQUIRED_ERROR,
  },
};
