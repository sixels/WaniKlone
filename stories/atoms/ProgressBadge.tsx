import classNames from "classnames";

interface ProgressBadgeProps {
  /**
   * The current badge progress
   */
  currentProgress: number;
  /**
   * The maximum progress the badge can reach. It must be greater than 2, or equals to 0
   */
  maxProgress: number;
  /**
   * The badge variant
   */
  variant: "radical" | "kanji" | "vocabulary";
  /**
   * The badge's content. It must be a string or an svg image
   */
  data: string | JSX.Element;
}
export const ProgressBadge = ({
  currentProgress,
  maxProgress,
  variant = "radical",
  data = "",
}: ProgressBadgeProps) => {
  const variantProps = {
    radical: {
      segmentColor: "bg-blue-600",
      segmentShadow: "shadow-blue-600",
      backgroundColor: "bg-blue-100",
      textColor: "text-blue-900",
      textSize: "text-xl",
    },
    kanji: {
      segmentColor: "bg-pink-600",
      segmentShadow: "shadow-pink-600",
      backgroundColor: "bg-pink-100",
      textColor: "text-pink-900",
      textSize: "text-xl",
    },
    vocabulary: {
      segmentColor: "bg-purple-600",
      segmentShadow: "shadow-purple-600",
      backgroundColor: "bg-purple-100",
      textColor: "text-purple-900",
      textSize: "text-lg",
    },
  };

  maxProgress = Math.max(0, maxProgress);
  currentProgress = Math.max(0, Math.min(currentProgress, maxProgress));

  const segments = [],
    segmentGap = 0,
    segmentStep = 360 / (maxProgress || 1);

  if (currentProgress <= maxProgress) {
    for (let i = 0; i < maxProgress; i++) {
      const segmentStyles = classNames(
        "absolute top-1/2 left-1/2 w-[50vw] h-[50vh] origin-top-left",
        i < currentProgress
          ? [
              variantProps[variant].segmentColor,
              variantProps[variant].segmentShadow,
              "shadow-[0_0_0_1px_var(--tw-shadow-colored)]",
            ]
          : variantProps[variant].backgroundColor
      );
      segments.push(
        <div
          key={i}
          className={segmentStyles}
          style={{
            transform: `rotate(${
              segmentStep * i + (-90 + segmentGap / 2)
            }deg) skew(${90 - segmentStep + segmentGap}deg)`,
          }}
        ></div>
      );
    }
  }

  const containerStyles = classNames(
    "shadow-subtle-highlight relative rounded-[50px] overflow-hidden flex items-center justify-center z-0 text-base w-fit min-w-[64px] h-[64px]",
    variantProps[variant].backgroundColor
  );
  const innerStyles = classNames(
    "h-[calc(100%_-_10px)] w-[calc(100%_-_10px)] bg-[inherit] rounded-[inherit] flex items-center justify-center px-[16px] font-jp break-keep",
    variantProps[variant].textColor,
    variantProps[variant].textSize
  );

  return (
    <div className={containerStyles}>
      <div className="w-full h-full absolute blur-sm -z-[1]">{segments}</div>
      <div className={innerStyles}>{data}</div>
    </div>
  );
};
