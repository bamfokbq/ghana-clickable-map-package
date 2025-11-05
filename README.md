# Ghana Clickable Map

A reusable, interactive React map component for Ghana's 16 regions, built with Leaflet and TypeScript. Perfect for data visualization, analytics dashboards, and region-based applications.

[![npm version](https://badge.fury.io/js/@kbqtech%2Fghana-clickable-map.svg)](https://www.npmjs.com/package/@kbqtech/ghana-clickable-map)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Interactive Region Selection** - Click regions to select/deselect them
- **URL Integration** - Automatically updates URL query parameters with selected region
- **Custom Styling** - Set custom colors for individual regions or states (default, selected, hover)
- **Hover Effects** - Beautiful tooltips showing region names on hover
- **TypeScript Support** - Fully typed with comprehensive type definitions
- **Next.js Optimized** - Built specifically for Next.js applications with App Router support
- **Responsive** - Adapts to different container sizes
- **Customizable** - Extensive props for controlling behavior and appearance
- **Lightweight** - Efficient rendering with minimal dependencies

## Installation

```bash
npm install @kbqtech/ghana-clickable-map
```

Or using yarn:

```bash
yarn add @kbqtech/ghana-clickable-map
```

### Peer Dependencies

This package requires the following peer dependencies:

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "next": "^13.0.0 || ^14.0.0",
  "leaflet": "^1.9.0",
  "react-leaflet": "^4.0.0"
}
```

Install them if you haven't already:

```bash
npm install react react-dom next leaflet react-leaflet
```

Don't forget to import Leaflet's CSS in your app (it's already included in the component):

```tsx
import 'leaflet/dist/leaflet.css';
```

## Quick Start

```tsx
import GhanaClickableMap from '@kbqtech/ghana-clickable-map';

export default function MyPage() {
  return (
    <div>
      <h1>Select a Region</h1>
      <GhanaClickableMap
        defaultColor="#e5e7eb"
        selectedColor="#ff9800"
        onRegionClick={(region) => console.log('Selected:', region)}
      />
    </div>
  );
}
```

## API Documentation

### Props

The `GhanaClickableMap` component accepts the following props:

#### `regionColors`
- **Type:** `{ [region: string]: string }`
- **Default:** `{}`
- **Description:** Custom colors for specific regions. Useful for data visualization (e.g., showing different metrics per region).

```tsx
<GhanaClickableMap
  regionColors={{
    "Greater Accra": "#ff0000",
    "Ashanti": "#00ff00",
    "Northern": "#0000ff"
  }}
/>
```

#### `defaultColor`
- **Type:** `string`
- **Default:** `"#e5e7eb"`
- **Description:** Default color for regions that don't have custom colors assigned.

#### `selectedColor`
- **Type:** `string`
- **Default:** `"#ff9800"`
- **Description:** Color for the currently selected region.

#### `hoverColor`
- **Type:** `string`
- **Default:** `undefined` (uses `selectedColor` if not provided)
- **Description:** Color for regions when hovered over.

#### `onRegionClick`
- **Type:** `(region: string | null) => void`
- **Default:** `undefined`
- **Description:** Callback function triggered when a region is clicked. Receives the region name or `null` if deselected.

```tsx
<GhanaClickableMap
  onRegionClick={(region) => {
    if (region) {
      console.log(`Selected: ${region}`);
    } else {
      console.log('Region deselected');
    }
  }}
/>
```

#### `updateUrl`
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Whether to update the URL with the selected region as a query parameter (`?region=RegionName`).

#### `initialRegion`
- **Type:** `string | null`
- **Default:** `null`
- **Description:** Initially selected region. Useful for pre-selecting a region based on URL params or application state.

#### `mapHeight`
- **Type:** `string`
- **Default:** `"600px"`
- **Description:** Height of the map container. Accepts any valid CSS height value.

```tsx
<GhanaClickableMap mapHeight="400px" />
```

#### `className`
- **Type:** `string`
- **Default:** `""`
- **Description:** Additional CSS class names for the container element.

#### `style`
- **Type:** `React.CSSProperties`
- **Default:** `{}`
- **Description:** Inline styles for the map container.

```tsx
<GhanaClickableMap
  style={{
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  }}
/>
```

#### `disabled`
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Whether the map is disabled (non-interactive). When `true`, clicking and dragging are disabled.

#### `showLabels`
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Whether to show region labels on the map. (Note: Currently shows labels on hover via tooltips)

## Usage Examples

### Basic Usage

Simple implementation with default settings:

```tsx
import GhanaClickableMap from '@kbqtech/ghana-clickable-map';

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <GhanaClickableMap />
    </div>
  );
}
```

### Custom Region Colors (Data Visualization)

Display data by coloring regions based on values:

```tsx
import GhanaClickableMap from '@kbqtech/ghana-clickable-map';

export default function SalesMap() {
  const salesData = {
    "Greater Accra": "#10b981", // High sales - green
    "Ashanti": "#10b981",
    "Western": "#fbbf24",       // Medium sales - yellow
    "Northern": "#ef4444",      // Low sales - red
  };

  return (
    <div>
      <h2>Regional Sales Performance</h2>
      <GhanaClickableMap
        regionColors={salesData}
        defaultColor="#e5e7eb"
        selectedColor="#3b82f6"
      />
    </div>
  );
}
```

### Handling Region Selection

React to region clicks and update application state:

```tsx
'use client';

import { useState } from 'react';
import GhanaClickableMap from '@kbqtech/ghana-clickable-map';

export default function RegionSelector() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  return (
    <div>
      <h2>Select Your Region</h2>
      {selectedRegion && (
        <p className="mb-4">
          You selected: <strong>{selectedRegion}</strong>
        </p>
      )}
      <GhanaClickableMap
        onRegionClick={(region) => {
          setSelectedRegion(region);
          // Fetch data for the selected region
          if (region) {
            fetchRegionData(region);
          }
        }}
      />
    </div>
  );
}
```

### Disable URL Updates

Prevent URL changes when regions are selected:

```tsx
<GhanaClickableMap
  updateUrl={false}
  onRegionClick={(region) => {
    // Handle selection without URL changes
    handleRegionSelect(region);
  }}
/>
```

### Custom Styling

Apply custom styles to match your design:

```tsx
<GhanaClickableMap
  mapHeight="500px"
  className="my-custom-map"
  style={{
    borderRadius: '16px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    border: '2px solid #e5e7eb'
  }}
  defaultColor="#f3f4f6"
  selectedColor="#8b5cf6"
  hoverColor="#a78bfa"
/>
```

### Pre-selected Region

Initialize the map with a region already selected:

```tsx
<GhanaClickableMap
  initialRegion="Greater Accra"
  selectedColor="#22c55e"
/>
```

### Disabled/Read-only Map

Display the map without interaction:

```tsx
<GhanaClickableMap
  disabled={true}
  regionColors={{
    "Greater Accra": "#3b82f6",
    "Ashanti": "#ef4444"
  }}
/>
```

## Ghana Regions

The component includes all 16 administrative regions of Ghana:

1. **Greater Accra** - Capital region
2. **Ashanti** - Garden City region
3. **Western** - Oil and mineral-rich region
4. **Western North** - Newly created region
5. **Central** - Coastal region
6. **Eastern** - Agricultural hub
7. **Volta** - Southeastern region
8. **Oti** - Newly created region
9. **Northern** - Largest by land area
10. **Savannah** - Newly created region
11. **North East** - Newly created region
12. **Upper East** - Northeastern border region
13. **Upper West** - Northwestern border region
14. **Bono** - Western central region
15. **Bono East** - Central region
16. **Ahafo** - Newly created region

## TypeScript Support

This package is written in TypeScript and includes comprehensive type definitions. All props are fully typed:

```tsx
import GhanaClickableMap, { 
  GhanaClickableMapProps, 
  GhanaRegion, 
  REGION_LABELS 
} from '@kbqtech/ghana-clickable-map';

// Access region coordinates
const accraCoords = REGION_LABELS["Greater Accra"]; // [5.7, 0.1]

// Type-safe region names
const region: GhanaRegion = "Greater Accra";
```

## Requirements

- React 18+
- Next.js 13+ or 14+ (App Router or Pages Router)
- Leaflet 1.9+
- React Leaflet 4+

## Browser Support

This component works in all modern browsers that support:
- ES2020 features
- CSS Grid and Flexbox
- SVG rendering

## License

MIT © [KBQ Tech](https://github.com/bamfokbq)

## Repository

- **GitHub:** [https://github.com/bamfokbq/ghana-clickable-map-package](https://github.com/bamfokbq/ghana-clickable-map-package)
- **Issues:** [https://github.com/bamfokbq/ghana-clickable-map-package/issues](https://github.com/bamfokbq/ghana-clickable-map-package/issues)
- **NPM:** [https://www.npmjs.com/package/@kbqtech/ghana-clickable-map](https://www.npmjs.com/package/@kbqtech/ghana-clickable-map)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/bamfokbq/ghana-clickable-map-package/issues) on GitHub.

---

Made with ❤️ for the Ghana developer community

