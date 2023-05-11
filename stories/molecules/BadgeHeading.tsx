import type { IconBadge } from "../atoms/IconBadge";

interface BadgeHeadingProps {
  /**
   * The heading's badge
   */
  badge: ReturnType<typeof IconBadge>;
  /**
   * The heading text
   */
  heading: string;
  /**
   * The heading's subheading
   */
  subheading?: string;
  /**
   * An extra information to be displayed next to the subheading
   */
  subheadingExtra?: string;
}
export const BadgeHeading = ({
  badge,
  heading,
  subheading,
  subheadingExtra,
}: BadgeHeadingProps) => {
  return (
    <div className="flex gap-2.5 items-center">
      {badge}
      <div className="flex flex-col justify-between py-1.5 font-semibold">
        <h1 className="text-base text-slate-700">{heading}</h1>
        {subheading && (
          <span className="text-xl text-slate-900 font-sans">
            {subheading}
            {subheadingExtra && (
              <>
                {" "}
                <span className="text-xs text-slate-700">
                  {subheadingExtra}
                </span>
              </>
            )}
          </span>
        )}
      </div>
    </div>
  );
};
