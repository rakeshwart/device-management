import { useEffect, useMemo, useRef } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { divIcon, type Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

const COLORADO: [number, number] = [39.0, -105.5];
const NORTH_AMERICA_BOUNDS: [[number, number], [number, number]] = [
  [7, -168],
  [75, -52],
];

function MapReady() {
  const map = useMap();
  useEffect(() => {
    const frame = map.getContainer();
    const stage = frame.parentElement;
    const sync = () => map.invalidateSize();
    sync();
    const observer = new ResizeObserver(sync);
    if (stage) observer.observe(stage);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [map]);
  return null;
}

export function DeviceMap() {
  const mapRef = useRef<LeafletMap>(null);
  const markerIcon = useMemo(
    () =>
      divIcon({
        className: "",
        html: '<span class="asset-marker"></span>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      }),
    [],
  );

  return (
    <>
      <MapContainer
        ref={mapRef}
        center={COLORADO}
        zoom={5}
        minZoom={3}
        maxZoom={12}
        maxBounds={NORTH_AMERICA_BOUNDS}
        maxBoundsViscosity={1}
        zoomControl={false}
        scrollWheelZoom
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='Leaflet | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <Marker position={COLORADO} icon={markerIcon} />
        <MapReady />
      </MapContainer>
      <div className="map-controls">
        <button type="button" aria-label="Filter" title="Filter">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M2 3h12L9.5 8.5V13l-3 1.5V8.5L2 3Z"
              stroke="#171C1E"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => mapRef.current?.zoomOut()}
        >
          −
        </button>
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => mapRef.current?.zoomIn()}
        >
          +
        </button>
      </div>
      <p className="map-status">
        <span>Assets: 2</span>
        <span>Geofences: 0</span>
        <span>Alerts: 4</span>
      </p>
    </>
  );
}
