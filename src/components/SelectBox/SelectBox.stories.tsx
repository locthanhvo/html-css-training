import type { Meta, StoryObj } from "@storybook/react";
import SelectBox from ".";
import "../../index.css";
import { STATUS_OPTIONS } from "@constants";

const meta = {
  title: "Components/SelectBox",
  component: SelectBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SelectBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectBoxUser: Story = {
  args: {
    className: "select-option item-validate",
    name: "status",
    optionList: STATUS_OPTIONS,
  },
};
