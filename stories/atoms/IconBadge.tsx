import classNames from "classnames";

import type { TwFgColor, TwBgColor } from "@/lib/tailwind-utils";

interface IconBadgeProps {
  /**
   * The badge's icon
   */
  icon: JSX.Element;
  /**
   * The icon color
   */
  iconColor?: TwFgColor;
  /**
   * The badge's background color
   */
  bgColor?: TwBgColor;
}

export const IconBadge = ({ icon, bgColor, iconColor }: IconBadgeProps) => {
  return (
    <div
      className={classNames(
        "shadow-subtle-highlight border border-white px-3.5 py-4 w-fit h-fit rounded-2xl",
        bgColor,
        iconColor
      )}
    >
      <div className="w-6 h-auto stroke-current stroke-2">{icon}</div>
    </div>
  );
};
