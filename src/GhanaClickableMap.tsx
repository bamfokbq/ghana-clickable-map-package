"use client";

import React, { useEffect, useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { PathOptions, LatLngBounds, Layer } from 'leaflet';
import { Feature, Geometry } from 'geojson';
import 'leaflet/dist/leaflet.css';

import geoData from './ghana-regions.json';
import { GhanaClickableMapProps, RegionLabels } from './types';

/**
 * Region coordinates for labels (latitude, longitude)
 */
const REGION_LABELS: RegionLabels = {
  "Greater Accra": [5.7, 0.1],
  "Ashanti": [6.7, -1.5],
  "Western": [5.5, -2.2],
  "Western North": [6.2, -2.8],
  "Central": [5.5, -1.0],
  "Eastern": [6.3, -0.4],
  "Volta": [6.5, 0.5],
  "Oti": [7.9, 0.2],
  "Northern": [9.6, -0.3],
  "Savannah": [9.2, -1.7],
  "North East": [10.4, -0.6],
  "Upper East": [10.8, -0.9],
  "Upper West": [10.3, -2.2],
  "Bono": [7.6, -2.4],
  "Bono East": [7.9, -1.2],
  "Ahafo": [6.9, -2.6]
};

/**
 * GhanaClickableMap - A reusable interactive map component for Ghana regions
 * 
 * Features:
 * - Click regions to update URL with selected region
 * - Customize colors for different states (default, selected, hover)
 * - Custom color per region
 * - Hover tooltips showing region names
 * - Optional callback for region selection
 * 
 * @example
 * ```tsx
 * <GhanaClickableMap
 *   defaultColor="#e5e7eb"
 *   selectedColor="#ff9800"
 *   onRegionClick={(region) => console.log('Selected:', region)}
 * />
 * ```
 */
export default function GhanaClickableMap({
  regionColors = {},
  defaultColor = '#e5e7eb',
  selectedColor = '#ff9800',
  hoverColor,
  onRegionClick,
  updateUrl = true,
  mapHeight = '600px',
  className = '',
  showLabels = false,
  initialRegion = null,
  style = {},
  disabled = false,
}: GhanaClickableMapProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedRegion, setSelectedRegion] = useState<string | null>(
    initialRegion || (updateUrl ? searchParams.get('region') : null)
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update URL when selected region changes
  useEffect(() => {
    if (!updateUrl) return;

    const currentRegion = searchParams.get('region');
    
    if (selectedRegion) {
      // Only update URL if it's different from current
      if (currentRegion !== selectedRegion) {
        const params = new URLSearchParams(searchParams.toString());
        params.set('region', selectedRegion);
        router.push(`?${params.toString()}`, { scroll: false });
      }
    } else {
      // Only update URL if there's a region parameter to remove
      if (currentRegion) {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('region');
        router.push(`?${params.toString()}`, { scroll: false });
      }
    }
  }, [selectedRegion, router, searchParams, updateUrl]);

  // Call external handler if provided
  useEffect(() => {
    if (onRegionClick) {
      onRegionClick(selectedRegion);
    }
  }, [selectedRegion, onRegionClick]);

  /**
   * Get the color for a specific region based on its state
   */
  const getRegionColor = useCallback(
    (region: string, isSelected: boolean): string => {
      if (isSelected) {
        return selectedColor;
      }
      
      // Check if there's a custom color for this region
      if (regionColors[region]) {
        return regionColors[region];
      }
      
      return defaultColor;
    },
    [regionColors, defaultColor, selectedColor]
  );

  /**
   * Style and bind events to each GeoJSON feature (region)
   */
  const onEachFeature = useCallback(
    (feature: Feature<Geometry, any>, layer: Layer) => {
      if (!feature.properties?.name) return;
      
      const region = feature.properties.name;
      const isSelected = selectedRegion && region.toLowerCase() === selectedRegion.toLowerCase();
      
      const style: PathOptions = {
        fillColor: getRegionColor(region, !!isSelected),
        weight: isSelected ? 3 : 2,
        opacity: 1,
        color: isSelected ? selectedColor : 'white',
        fillOpacity: 0.7,
      };
      
      (layer as any).setStyle(style);
      
      if (!disabled) {
        layer.on({
          click: () => {
            setSelectedRegion(isSelected ? null : region);
          },
          mouseover: (e: any) => {
            if (!isSelected) {
              e.target.setStyle({
                fillColor: hoverColor || selectedColor,
                fillOpacity: 0.5,
              });
            }
            layer.openTooltip();
          },
          mouseout: (e: any) => {
            if (!isSelected) {
              e.target.setStyle({
                fillColor: getRegionColor(region, false),
                fillOpacity: 0.7,
              });
            }
          },
        });
      }
      
      // Bind tooltip
      layer.bindTooltip(region, { 
        sticky: true,
        className: 'ghana-map-tooltip'
      });
    },
    [selectedRegion, getRegionColor, selectedColor, hoverColor, disabled]
  );

  // Ghana map bounds
  const ghanaBounds = new LatLngBounds([4.7, -3.5], [11.2, 1.2]);

  if (!mounted) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}
        style={{ height: mapHeight, ...style }}
      >
        <div className="text-gray-500 animate-pulse">Loading Map...</div>
      </div>
    );
  }

  return (
    <div 
      className={`ghana-clickable-map-container ${className}`}
      style={{ height: mapHeight, ...style }}
    >
      <div className="relative w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
        <MapContainer
          center={[7.9465, -1.0232]}
          zoom={6.5}
          style={{ height: '100%', width: '100%' }}
          bounds={ghanaBounds}
          maxBounds={ghanaBounds}
          attributionControl={false}
          minZoom={6}
          maxZoom={7}
          boundsOptions={{ padding: [5, 5] }}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          dragging={!disabled}
          touchZoom={false}
          boxZoom={false}
          keyboard={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className="map-tiles"
          />
          <GeoJSON
            key={selectedRegion || 'none'}
            data={geoData as any}
            onEachFeature={onEachFeature}
            style={{ weight: 2, opacity: 1, color: 'white', fillOpacity: 0.7 }}
          />
        </MapContainer>
      </div>

      {/* Embedded styles */}
      <style>{`
        .ghana-clickable-map-container .map-tiles {
          filter: grayscale(100%) brightness(0.9);
        }
        
        .ghana-clickable-map-container .leaflet-container {
          background: #f8fafc;
        }
        
        .ghana-clickable-map-container .leaflet-tile-pane {
          display: none !important;
        }
        
        .ghana-clickable-map-container .leaflet-control-container {
          display: none !important;
        }
        
        .ghana-clickable-map-container .leaflet-interactive {
          cursor: ${disabled ? 'default' : 'pointer'};
          transition: fill-opacity 0.2s ease;
        }
        
        .ghana-clickable-map-container .leaflet-interactive:focus {
          outline: none !important;
        }
        
        .ghana-clickable-map-container .ghana-map-tooltip {
          background-color: rgba(0, 0, 0, 0.8);
          color: white;
          border: none;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 12px;
          font-weight: 500;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .ghana-clickable-map-container .leaflet-tooltip-left.ghana-map-tooltip::before,
        .ghana-clickable-map-container .leaflet-tooltip-right.ghana-map-tooltip::before {
          border-left-color: rgba(0, 0, 0, 0.8);
          border-right-color: rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </div>
  );
}

// Export types and region labels for external use
export { REGION_LABELS };
export type { GhanaClickableMapProps, RegionLabels } from './types';

