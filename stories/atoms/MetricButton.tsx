import { ChevronRightIcon } from "@sixels-heroicons/react/24/outline";

import type { TwFgColor } from "@/lib/tailwind-utils";

interface MetricButtonProps {
  /**
   * The button's icon
   */
  icon: JSX.Element;
  /**
   * The icon color
   */
  iconColor: TwFgColor;
  /**
   * The button label
   */
  label: string;
  /**
   * The metric text
   */
  metric: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

export const MetricButton = ({
  icon,
  label,
  iconColor,
  metric,
  onClick,
}: MetricButtonProps) => {
  return (
    <ButtonWrapper onClick={onClick}>
      <>
        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-auto stroke-current stroke-2${
              iconColor ? " " + iconColor : ""
            }`}
          >
            {icon}
          </div>
          <span className="text-slate-700 text-lg">{label}</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-slate-900 text-lg">{metric}</span>
          {onClick && (
            <ChevronRightIcon className="stroke-slate-500 w-6 h-auto stroke-2" />
          )}
        </div>
      </>
    </ButtonWrapper>
  );
};

const ButtonWrapper = ({
  onClick,
  children,
}: React.PropsWithChildren<{ onClick?: MetricButtonProps["onClick"] }>) => {
  const buttonStyles =
    "flex justify-between w-full font-semibold bg-slate-200 py-3.5 px-3 rounded-xl border border-white shadow-[0_0_0_2px_rgb(226,232,240)]";
  return onClick ? (
    <button className={buttonStyles}>{children}</button>
  ) : (
    <div className={buttonStyles}>{children}</div>
  );
};
