import React, { useRef, useEffect } from "react";

import "./Map.scss";

const Map: React.FC<IMap> = ({ className, style, center, zoom = 14 }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current as any, {
      center,
      zoom
    });

    new window.google.maps.Marker({ position: center, map });
  }, [center, zoom]);

  return <div ref={mapRef} className={`map ${className}`} style={style} />;
};

export default Map;

interface IMap {
  className?: string;
  style?: {
    [type: string]: string;
  };
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
}
