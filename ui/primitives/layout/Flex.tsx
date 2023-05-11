import { PrimitivePropsWithChildren } from "../core";

interface FlexProps extends PrimitivePropsWithChildren {
  direction?: "row" | "column";
  align?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
}
export const Flex = ({ className, children, style, direction }: FlexProps) => {
  const directions = {
    row: "flex-row",
    column: "flex-col",
  };

  const styles = `flex ${direction ? directions[direction] : "flex-row"}`;

  return (
    <div
      className={"items-" + styles + className ? ` ${className}` : ""}
      style={style}
    >
      {children}
    </div>
  );
};
