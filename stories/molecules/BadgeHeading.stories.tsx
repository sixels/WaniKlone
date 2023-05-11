import type { Meta, StoryObj } from "@storybook/react";
import { BadgeHeading } from "./BadgeHeading";
import { IconBadge } from "../atoms/IconBadge";
import { CalendarDaysIcon } from "@sixels-heroicons/react/24/outline";

const meta: Meta<typeof BadgeHeading> = {
  title: "Molecules/BadgeHeading",
  component: BadgeHeading,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof BadgeHeading>;

export const Complete: Story = {
  args: {
    badge: (
      <IconBadge
        icon={<CalendarDaysIcon />}
        bgColor="bg-indigo-100"
        iconColor="text-indigo-600"
      />
    ),
    heading: "Upcoming Reviews",
    subheading: "+172 reviews",
    subheadingExtra: "for this week",
  },
};

export const NoExtra: Story = {
  args: {
    badge: (
      <IconBadge
        icon={<CalendarDaysIcon />}
        bgColor="bg-indigo-100"
        iconColor="text-indigo-600"
      />
    ),
    heading: "Upcoming Reviews",
    subheading: "+172 reviews",
  },
};

export const NoSubheading: Story = {
  args: {
    badge: (
      <IconBadge
        icon={<CalendarDaysIcon />}
        bgColor="bg-indigo-100"
        iconColor="text-indigo-600"
      />
    ),
    heading: "Upcoming Reviews",
  },
};
