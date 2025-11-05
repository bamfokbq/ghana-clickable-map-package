/**
 * TypeScript type definitions for the Ghana Clickable Map component
 */

import { FeatureCollection } from 'geojson';

/**
 * Props for the GhanaClickableMap component
 */
export interface GhanaClickableMapProps {
  /**
   * Custom colors for specific regions
   * Example: { "Greater Accra": "#ff0000", "Ashanti": "#00ff00" }
   */
  regionColors?: { [region: string]: string };

  /**
   * Default color for regions that don't have data
   * @default "#e5e7eb"
   */
  defaultColor?: string;

  /**
   * Color for the currently selected region
   * @default "#ff9800"
   */
  selectedColor?: string;

  /**
   * Color for regions when hovered (optional, uses selectedColor if not provided)
   */
  hoverColor?: string;

  /**
   * Callback function triggered when a region is clicked
   * @param region - Name of the clicked region, or null if deselected
   */
  onRegionClick?: (region: string | null) => void;

  /**
   * Whether to update the URL with the selected region as a query parameter
   * @default true
   */
  updateUrl?: boolean;

  /**
   * Height of the map container
   * @default "600px"
   */
  mapHeight?: string;

  /**
   * Additional CSS class names for the container
   */
  className?: string;

  /**
   * Whether to show region count labels on the map
   * @default false
   */
  showLabels?: boolean;

  /**
   * Initially selected region (useful for pre-selecting based on URL params)
   */
  initialRegion?: string | null;

  /**
   * Custom styles for the map container
   */
  style?: React.CSSProperties;

  /**
   * Whether the map is disabled (non-interactive)
   * @default false
   */
  disabled?: boolean;
}

/**
 * Region label positions (latitude, longitude)
 */
export interface RegionLabels {
  [region: string]: [number, number];
}

/**
 * Ghana region names (all 16 regions)
 */
export type GhanaRegion =
  | "Greater Accra"
  | "Ashanti"
  | "Western"
  | "Western North"
  | "Central"
  | "Eastern"
  | "Volta"
  | "Oti"
  | "Northern"
  | "Savannah"
  | "North East"
  | "Upper East"
  | "Upper West"
  | "Bono"
  | "Bono East"
  | "Ahafo";

/**
 * GeoJSON data structure for Ghana regions
 */
export interface GhanaGeoData extends FeatureCollection {
  features: Array<{
    type: "Feature";
    properties: {
      name: string;
      [key: string]: any;
    };
    geometry: {
      type: "Polygon" | "MultiPolygon";
      coordinates: any;
    };
  }>;
}

