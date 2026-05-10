declare module 'react-simple-maps' {
  import { ComponentType, ReactNode, SVGProps, CSSProperties } from 'react';

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: Record<string, unknown>;
    width?: number;
    height?: number;
    style?: CSSProperties;
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
  export interface GeographyStyle {
    default?: CSSProperties;
    hover?: CSSProperties;
    pressed?: CSSProperties;
  }
  export interface GeographyProps {
    geography: Geography;
    style?: GeographyStyle;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    onClick?: (geo: Geography) => void;
    onMouseEnter?: (geo: Geography, evt: React.MouseEvent) => void;
    onMouseLeave?: (geo: Geography, evt: React.MouseEvent) => void;
    [key: string]: unknown;
  }
  export const Geography: ComponentType<GeographyProps>;
}
