import { FC, useState, useEffect } from 'react';
import { Event, Coordinate, Viewport } from 'types';
import Image from 'next/image';
import ReactMapGl, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Geocode from 'react-geocode';

interface EventMapProps {
  evt: Event;
}

const EventMap: FC<EventMapProps> = ({ evt }) => {
  const [lat, setLat] = useState<Coordinate>(null!);
  const [lng, setLng] = useState<Coordinate>(null!);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewport, setViewport] = useState<Viewport>({
    latitude: 40.712772,
    longitude: -73.935242,
    width: '100%',
    height: '500px',
    zoom: 12,
  });

  const geoapifyKey: string = process.env.NEXT_PUBLIC_GEOAPIFY_MAP_API_KEY!;
  const mapboxToken: string = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN!;

  useEffect(() => {
    if (geoapifyKey && evt) {
      fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${evt.address}&apiKey=${geoapifyKey}`
      )
        .then((response) => response.json())
        .then((result) => {
          const { lat, lon } = result.features[0].properties;
          setLat(lat);
          setLng(lon);
          setViewport({ ...viewport, latitude: lat, longitude: lon });
          setLoading(false);
        })
        .catch((error) => console.log('Please check your address'));
    }
    // eslint-disable-next-line
  }, []);

  Geocode.setApiKey(geoapifyKey);

  if (loading) return <h4>Map Loading...</h4>;

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={mapboxToken}
      onViewportChange={(vp: Viewport) => setViewport(vp)}
    >
      <Marker key={evt.id} latitude={lat} longitude={lng}>
        <Image src='/images/pin.svg' width={30} height={30} alt='' />
      </Marker>
    </ReactMapGl>
  );
};

export default EventMap;
