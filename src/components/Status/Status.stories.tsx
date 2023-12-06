import type { Meta, StoryObj } from "@storybook/react";
import StatusUser from ".";
import "../../index.css";
import { STATUS } from "@constants";

const meta = {
  title: "Components/Status",
  component: StatusUser,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StatusUser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StatusActive: Story = {
  args: {
    status: STATUS.ACTIVE,
  },
};

export const StatusOffline: Story = {
  args: {
    status: STATUS.OFFLINE,
  },
};

export const StatusWait: Story = {
  args: {
    status: STATUS.WAIT,
  },
};
