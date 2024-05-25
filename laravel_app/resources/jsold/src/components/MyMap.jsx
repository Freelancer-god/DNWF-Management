import React, {Fragment} from "react";
import {GoogleMap, MarkerF, useJsApiLoader} from '@react-google-maps/api';
import {clog} from "../utils";

const containerStyle = {
	width: '100%',
	height: '435px'
};

const center = {
	lat: 10.9471327,
	lng: 106.8274516
};
const MyMap = ({store}) => {
	const {isLoaded} = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: "AIzaSyCRh2YYSP3Fr7pRGrzRjemLhDHuZ4ZLwjs"  //need to define your google api key
	})

	const [map, setMap] = React.useState(null)

	const onLoad = React.useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);
		setMap(map)
	}, [])

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null)
	}, [])


	return <div>
		{isLoaded ?
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={20}
				defaultOptions={{mapTypeControl: false}}
				// onLoad={onLoad}
				// onUnmount={onUnmount}
			>
				{ /* Child components, such as markers, info windows, etc. */}
				{store?.map((item, index, array) => {
					clog(item.icon)
					return (
						<MarkerF
							key={item.id}
							options={{
								icon: {
									scaledSize: new window.google.maps.Size(30, 30),
									url: item.icon,
								},
							}}
							position={{
								lat: parseFloat(item.address.lat),
								lng: parseFloat(item.address.lng),
							}}/>
					)
				})}
			</GoogleMap>
			: <></>
		}
	</div>


}

export default MyMap;


// import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
//
// const MyMapComponent = withScriptjs(withGoogleMap((props) =>
//     <GoogleMap
//         defaultZoom={8}
//         defaultCenter={{ lat: -34.397, lng: 150.644 }}
//     >
//         {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
//     </GoogleMap>
// ))
//
// export default MyMapComponent
