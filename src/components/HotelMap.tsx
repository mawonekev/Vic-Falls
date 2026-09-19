'use client';

import React, { useEffect, useRef } from 'react';
import { MappedProperty } from '@/lib/types';

interface HotelMapProps {
  properties: MappedProperty[];
  selectedProperty: MappedProperty | null;
  onSelectProperty: (property: MappedProperty) => void;
  center?: [number, number];
  zoom?: number;
}

export function HotelMap({
  properties,
  selectedProperty,
  onSelectProperty,
  center = [-17.9244, 25.845], // Centered between Victoria Falls and Livingstone
  zoom = 12
}: HotelMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [id: string]: any }>({});

  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    // Load Leaflet dynamically
    import('leaflet').then(L => {
      // Fix default Leaflet icon issues
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current!, {
          center: center,
          zoom: zoom,
          scrollWheelZoom: false
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        mapInstanceRef.current = map;
      }

      const map = mapInstanceRef.current;

      // Clear existing markers
      Object.values(markersRef.current).forEach(marker => marker.remove());
      markersRef.current = {};

      // Add custom gold vs gray pin markers
      properties.forEach(prop => {
        const isSelected = selectedProperty?.id === prop.id;
        const isPartner = prop.isBookablePartner;

        const pinColor = isPartner ? '#d4af37' : '#6c757d'; // Gold for bookable partner, Gray for reference
        const pinBorder = isSelected ? '#ffffff' : pinColor;
        const pinSize = isSelected ? 36 : 28;

        const customIcon = L.divIcon({
          className: 'custom-hotel-pin',
          html: `
            <div style="
              width: ${pinSize}px;
              height: ${pinSize}px;
              border-radius: 50% 50% 50% 0;
              background: ${pinColor};
              border: 3px solid ${pinBorder};
              transform: rotate(-45deg);
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            ">
              <div style="
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #ffffff;
                transform: rotate(45deg);
              "></div>
            </div>
          `,
          iconSize: [pinSize, pinSize],
          iconAnchor: [pinSize / 2, pinSize]
        });

        const marker = L.marker([prop.latitude, prop.longitude], { icon: customIcon }).addTo(map);

        marker.on('click', () => {
          onSelectProperty(prop);
        });

        markersRef.current[prop.id] = marker;
      });

      // Pan to selected property if any
      if (selectedProperty) {
        map.setView([selectedProperty.latitude, selectedProperty.longitude], 14, { animate: true });
      }
    });

    return () => {
      // Keep map instance alive across rerenders
    };
  }, [properties, selectedProperty, center, zoom]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '520px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--sand-border)', boxShadow: 'var(--shadow-md)' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', minHeight: '520px' }} />

      {/* Map Legend Overlay */}
      <div style={{
        position: 'absolute',
        top: 14,
        right: 14,
        zIndex: 400,
        background: 'rgba(18, 22, 29, 0.88)',
        backdropFilter: 'blur(8px)',
        padding: '10px 16px',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.8rem',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--gold-primary)' }} />
          <span><strong>Gold Pin:</strong> Bookable Partner Lodges</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#6c757d' }} />
          <span><strong>Gray Pin:</strong> Regional Reference Hotels</span>
        </div>
      </div>
    </div>
  );
}
