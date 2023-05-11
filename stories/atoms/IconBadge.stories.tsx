import type { Meta, StoryObj } from "@storybook/react";
import { ClipboardIcon } from "@sixels-heroicons/react/24/outline";

import { IconBadge } from "./IconBadge";

const meta: Meta<typeof IconBadge> = {
  title: "Atoms/IconBadge",
  component: IconBadge,
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj<typeof IconBadge> = {
  args: {
    icon: <ClipboardIcon />,
    bgColor: "bg-fuchsia-100",
    iconColor: "text-fuchsia-600",
  },
};
