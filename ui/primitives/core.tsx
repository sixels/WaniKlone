export interface PrimitiveProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface PrimitivePropsWithChildren extends PrimitiveProps {
  children: React.ReactNode;
}
