declare module 'react-simple-maps' {
  import { ComponentType, ReactNode, SVGProps } from 'react';

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: Record<string, unknown>;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    children?: ReactNode;
    [key: string]: unknown;
  }
  export const ComposableMap: ComponentType<ComposableMapProps>;

  export interface GeographiesProps {
    geography: string | Record<string, unknown>;
    children: (props: { geographies: Geography[] }) => ReactNode;
    [key: string]: unknown;
  }
  export const Geographies: ComponentType<GeographiesProps>;

  export interface Geography {
    rsmKey: string;
    id: string;
    properties: Record<string, unknown>;
    [key: string]: unknown;
  }
  export interface GeographyProps extends SVGProps<SVGPathElement> {
    geography: Geography;
    [key: string]: unknown;
  }
  export const Geography: ComponentType<GeographyProps>;
}
