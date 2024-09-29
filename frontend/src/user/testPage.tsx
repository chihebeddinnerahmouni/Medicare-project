import { useState, useEffect, useCallback } from "react";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker } from "@react-google-maps/api";

const mapKey = import.meta.env.VITE_MAP_API_KEY as string;


const MapComponent = () => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  // const mapRef = useRef(null);
  // const userMarkerRef = useRef(null);

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  console.log("anaaaaaaaaa");

  const homePosition = { lat: 36.190518, lng:  5.407366 };

  // Update the current position using the browser's Geolocation API
  // useEffect(() => {
  //   const success = (position : any )=> {
  //     const currentLatLng = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude,
  //     };
  //     setCurrentPosition(currentLatLng);
  //   };

  //   const error = () => {
  //     console.error("Unable to retrieve your location");
  //   };

  //   const watchId = navigator.geolocation.watchPosition(success, error);

  //   // Clean up by stopping the geolocation tracking when the component unmounts
  //   return () => navigator.geolocation.clearWatch(watchId);
  // }, []);

  // Directions callback to handle response
  const directionsCallback = useCallback((response: any) => {
    if (response !== null) {
      if (response.status === "OK") {
        setDirectionsResponse(response);
      } else {
        console.error(`Error fetching directions ${response}`);
      }
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey= {mapKey}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        // center={currentPosition.lat !== 0 ? currentPosition : homePosition}
        center={{lat: 36.206795, lng:  5.414490}}
        // onLoad={(map) => (mapRef.current = map)}
      >
        {currentPosition.lat !== 0 && (
          <>
            {/* Marker to show the user's current position */}
            <Marker
              position={currentPosition}
              // ref={userMarkerRef}
            />

            {/* Directions Service to calculate the route */}
            <DirectionsService
              options={{
                origin: {lat: 36.206795, lng:  5.414490},
                destination: homePosition,
                travelMode: window.google && window.google.maps.TravelMode.DRIVING
              }}
              callback={directionsCallback}
            />
          </>
        )}
        {/* Render the directions on the map */}
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;


// import {
//   APIProvider,
//   Map,
//   AdvancedMarker,
//   Pin,
//   InfoWindow,
// } from "@vis.gl/react-google-maps";
// import { useState } from "react";

// const testPage = () => {

//   const [position, setPosition] = useState<any>();
//   const mapKey = import.meta.env.VITE_MAP_API_KEY as string;
//   console.log("anaaaaaaaaa");

//   return (
//     <>

//       <div className="map w-[100%] h-[100vh]">
//         <APIProvider apiKey={mapKey}>
//           <Map
//             zoom={13}
//             center={{ lat: 36.193977, lng: 5.418541 }}
//             // style={{ width: "100%", height: "100%" }}
//             // mapId={"a921b987b1309f91"}
//             // zoomControl={true}
//           >
//             {/* {position && (
//               <AdvancedMarker
//                 position={{ lat: position[0], lng: position[1] }}
//               >
//                 <span>👩‍⚕️</span>
//               </AdvancedMarker>
//             )} */}
//         </Map>
//         </APIProvider>
//         </div>

//     </>
//   );
// };

// export default testPage;
