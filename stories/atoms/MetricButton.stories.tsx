import type { Meta, StoryObj } from "@storybook/react";
import { MetricButton } from "./MetricButton";
import { CheckCircleIcon } from "@sixels-heroicons/react/24/outline";

const meta: Meta<typeof MetricButton> = {
  title: "Atoms/MetricButton",
  component: MetricButton,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof MetricButton>;

export const Complete: Story = {
  args: {
    icon: <CheckCircleIcon />,
    iconColor: "text-green-600",
    label: "Correct",
    metric: "231",
    // onClick: () => {},
  },
};

export const NoAction: Story = {
  args: {
    icon: <CheckCircleIcon />,
    iconColor: "text-green-600",
    label: "Correct",
    metric: "231",
    onClick: undefined,
  },
};
