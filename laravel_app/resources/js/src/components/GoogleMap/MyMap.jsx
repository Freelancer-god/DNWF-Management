import React, { useEffect } from 'react';

import {
  GoogleMap, Marker, useJsApiLoader, InfoWindow, Polyline,
} from '@react-google-maps/api';
import { decodeRoute } from '../../utils/routeDecode';
import { clog, tt } from '../../utils';
import { getTracker } from '../../store/TripManager/API';
import { moto, userMarker } from '../../assets';
import { VEHICLE_MAP_W_COLOR } from '../../constants';

const key = 'AIzaSyCfvEzzBVX-Aq71pU1UzvzD3WABn6rEnwM';

const containerStyle = {

  width: '100%',
  height: '80vh',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function MyMap({ trip }) {
  // const [path, setPath] = React.useState();
  const [driver, setDriver] = React.useState(null);
  const [customer, setCustomer] = React.useState(null);
  const [showDriverInfo, setShowDriverInfo] = React.useState(false);
  const [showCustomerInfo, setShowCustomerInfo] = React.useState(false);

  const fetchData = async () => {
    try {
      const rs = await getTracker({ tripId: trip?.id });
      // kiem tra rs.data

      if (rs) {
        if (rs.driver) {
          setDriver(rs.driver);
        }
        if (rs.customer) {
          setCustomer(rs.customer);
        }
      }
      // debugger;
    // Handle the fetched data
    } catch (error) {
    // Handle the error
    }
  };

  // chinh interval de fetchData 5s mot lan
  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (trip) {
    const path = (trip && trip.trip_vehicle_types && trip.trip_vehicle_types.length > 0) ? decodeRoute(trip.trip_vehicle_types[0].routes) : [];
    clog((path));
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: key,
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback((map) => {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(path[0]);
      bounds.extend(path[path.length - 1]);
      map.fitBounds(bounds);

      setMap(map);
    }, []);

    const onUnmount = React.useCallback((map) => {
      setMap(null);
    }, []);
    // clog('driver', { lat: driver.coordinates[0], lng: driver.coordinates[1] });
    return isLoaded ? (
      <GoogleMap
        streetView={false}
        mapContainerStyle={containerStyle}
        // center={path[0]}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        {driver && driver.coordinates && (
        <Marker
          icon={trip.trip_vehicle_types && trip.trip_vehicle_types.length > 0 ? VEHICLE_MAP_W_COLOR[trip.trip_vehicle_types[0].vehicle_type_id].icon : moto}
          position={{ lat: driver.coordinates[1], lng: driver.coordinates[0] }}
          onClick={() => setShowDriverInfo(!showDriverInfo)}
        >
          {showDriverInfo && (
          <InfoWindow onCloseClick={() => setShowDriverInfo(false)}>
            <div className="w-[200px]">
              <div>
                <span className=" font-bold">{tt('Mã:')}</span>
                {trip.driver_reference}
              </div>
              <div>
                <span className=" font-bold">{tt('Tên:')}</span>
                {trip.driver_name}
              </div>
              <div>
                <span className=" font-bold">{tt('SĐT:')}</span>
                {trip.driver_phone}
              </div>
            </div>
          </InfoWindow>
          )}

        </Marker>
        )}

        {customer && customer.coordinates && (
        <Marker
          icon={userMarker}
          // icon={trip.trip_vehicle_types && trip.trip_vehicle_types.length > 0 ? VEHICLE_MAP_W_COLOR[trip.trip_vehicle_types[0].vehicle_type_id].icon : moto}
          position={{ lat: customer.coordinates[1], lng: customer.coordinates[0] }}
          onClick={() => setShowDriverInfo(!showDriverInfo)}
        >
          {showCustomerInfo && (
          <InfoWindow onCloseClick={() => setShowDriverInfo(false)}>
            <div className="w-[200px]">
              <div>
                <span className=" font-bold">{tt('Mã:')}</span>
                {trip.passenger_reference}
              </div>
              <div>
                <span className=" font-bold">{tt('Tên:')}</span>
                {trip.passenger_name}
              </div>
              <div>
                <span className=" font-bold">{tt('SĐT:')}</span>
                {trip.passenger_phone}
              </div>
            </div>
          </InfoWindow>
          )}

        </Marker>
        )}

        {/* <Marker
          position={center}
          // onClick={props.onToggleOpen}
        >
          {true && (
          <InfoWindow onCloseClick={() => {}}>
            <div>
              test
            </div>
          </InfoWindow>
          )}
        </Marker> */}
        <Polyline
          path={path}
          geodesic
          options={{
            strokeColor: '#ff2527',
            strokeOpacity: 0.75,
            strokeWeight: 4,
            icons: [
              {
                // icon: lineSymbol,
                offset: '0',
                repeat: '20px',
              },
            ],
          }}
        />
      </GoogleMap>
    ) : <></>;
  }
  return null;
}

export default React.memo(MyMap);
