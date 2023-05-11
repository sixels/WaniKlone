import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBadge } from "./ProgressBadge";

const meta: Meta<typeof ProgressBadge> = {
  title: "Atoms/ProgressBadge",
  component: ProgressBadge,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ProgressBadge>;

export const Radical: Story = {
  args: {
    currentProgress: 5,
    maxProgress: 5,
    variant: "radical",
    data: "畐",
  },
};

export const Kanji: Story = {
  args: {
    currentProgress: 1,
    maxProgress: 5,
    variant: "kanji",
    data: "賊",
  },
};

export const Vocabulary: Story = {
  args: {
    currentProgress: 3,
    maxProgress: 5,
    variant: "vocabulary",
    data: "雲行き",
  },
};
