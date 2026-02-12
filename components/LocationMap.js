import React, { useRef, useState } from 'react';
import GoogleMap from 'google-maps-react-markers';

import { Icon } from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/map-marker';

const locations = [
  {
    name: 'Latin Dance Socials at Guildhall, High Wycombe',
    lat: 51.62945971678308,
    lng: -0.7514637303734821,
  },
];

const Marker = ({
  className,
  name,
  lat,
  lng,
  markerId,
  onClick,
  draggable,
  ...props
}) =>
  lat && lng ? (
    <div id="pin" className="w-[200px]" onClick={(e) => (onClick ? onClick(e, { markerId, lat, lng }) : null)} alt={markerId}>
      <Icon height="2em" icon={locationIcon} className="pin-icon w-15" />
      <p id="pin-text" className="p-4 font-bigShoulder text-bodyS bg-red-400 bg-opacity-80">
      {name}
    </p>
    </div>
  ) : null;

const LocationMap = () => {
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  /**
   * @description This function is called when the map is ready
   * @param {Object} map - reference to the map instance
   * @param {Object} maps - reference to the maps library
   */
  const onGoogleApiLoaded = ({ map, maps }) => {
    mapRef.current = map;
    setMapReady(true);
  };

  const onMarkerClick = (e, { markerId, lat, lng }) => {
    console.log('This is ->', markerId);

    // inside the map instance you can call any google maps method
    mapRef.current.setCenter({ lat, lng });
    // ref. https://developers.google.com/maps/documentation/javascript/reference?hl=it
  };
  return (
    <>
      {mapReady && <div>.</div>}
      <GoogleMap
        apiKey={process.env.NEXT_PUBLIC_MAP_API}
        defaultCenter={locations[0]}
        defaultZoom={17}
        mapMinHeight="65vh"
        onGoogleApiLoaded={onGoogleApiLoaded}
        onChange={(map) => console.log('Map moved', map)}>
        {locations.map(({ lat, lng, name }, index) => (
          <Marker
            key={index}
            lat={lat}
            lng={lng}
            markerId={name}
            name={name}
            onClick={onMarkerClick} // you need to manage this prop on your Marker component!
          />
        ))}
      </GoogleMap>
    </>
  );
};

export default LocationMap;
