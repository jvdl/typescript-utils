import { ComponentProps, JSXElementConstructor, ReactNode } from 'react';

/**
 * A HOC to create a wrapper component that applies default props to a given component.
 *
 * Typically used to create styled components with default props.
 *
 * @param Component - the component to apply default props to
 * @param defaultProps - the props to apply by default
 * @returns - Wrapped component with default props applied
 * @example
 * // use with styled components
 * const Heading3 = withDefaultProps(Typography, { variant: "h3" });
 * const MyTitle = styled(Heading3)`...`;
 * @example
 * // use standalone
 * const SmallChip = withDefaultProps(Chip, { size: "small" });
 * <SmallChip label="Example" />
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const withDefaultProps = <C extends JSXElementConstructor<any>>(
  Component: C,
  defaultProps: Partial<ComponentProps<typeof Component>>
): ((props: ComponentProps<C>) => ReactNode) => {
  const ComponentWithDefaults = (props: ComponentProps<C>) => {
    const allProps = { ...defaultProps, ...props } as ComponentProps<
      typeof Component
    >;
    return <Component {...allProps} />;
  };
  ComponentWithDefaults.displayName = `withDefaultProps(${Component.name || 'Component'})`;
  return ComponentWithDefaults;
};
