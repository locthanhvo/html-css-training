import type { Meta, StoryObj } from "@storybook/react";
import Text from ".";
import "../../../index.css";
import { Colors, FontSize, FontWeight } from "@themes";

const meta = {
  title: "Components/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextEmail: Story = {
  args: {
    content: "jessica.hanson@example.com",
    color: Colors.Black,
    fontSize: FontSize.TwoSmall,
    fontWeight: FontWeight.Regular,
  },
};

export const TextFirstName: Story = {
  args: {
    content: "@jane",
    color: Colors.GreyDark,
    fontSize: FontSize.Medium,
    fontWeight: FontWeight.Regular,
  },
};
