import React, {useContext, useEffect, useState} from 'react'
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { UserDataContext } from '../UserRoot';





const MapPage = ({ setPage }: any) => {

  const mapKey = import.meta.env.VITE_MAP_API_KEY;
    const { userLocation, setUserLocation } = useContext(UserDataContext);
    const [isValidLocation, setIsValidLocation] = useState(false);

  // for checking if the user location is valid
  useEffect(() => {
    setIsValidLocation(userLocation && userLocation.length > 0);
  }, [userLocation]);

    
    
    
  return (
    <div className="w-full mt-80" style={{ minHeight: "calc(100vh - 80px)" }}>
      <LoadScript googleMapsApiKey={mapKey}>
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "calc(100vh - 80px)",
            position: "absolute",
            top: 80,
            left: 0,
            zIndex: 0,
          }}
          center={{ lat: 36.191655, lng: 5.41035 }}
          zoom={12.5}
          options={{
            disableDefaultUI: true,
            styles: [
              {
                featureType: "landscape.natural",
                elementType: "geometry",
                stylers: [{ color: "#ffffff" }],
              },
            ],
          }}
          onClick={(e) => {
            setUserLocation([e.latLng!.lat(), e.latLng!.lng()]);
          }}
        >
          {isValidLocation && (
            <Marker position={{ lat: userLocation[0], lng: userLocation[1] }} />
          )}
        </GoogleMap>
      </LoadScript>

      <div
        className={`card py-[18px] flex flex-col items-center px-[22px] border-1 border-mainGreen bg-white absolute bottom-[0px] left-[50%] translate-x-[-50%] rounded-tr-20 rounded-tl-20`}
        style={{ width: "calc(100% - 30px)" }}
      >
        <p className={`text-[20px] font-medium text-darkGreen`}>
          Sélectionnez votre position
        </p>
        <div className="button w-full mt-5">
          <button
            className={`w-full ${
              isValidLocation
                ? "text-white bg-mainGreen"
                : "bg-[#D7DBE1] text-mainWritingGrey"
            } h-[54px] rounded-15 shadow-hardShadow text-[18px] font-medium`}
            disabled={!isValidLocation}
            onClick={() => {
              setPage(1);
            }}
          >
            Validé
          </button>
        </div>
      </div>
    </div>
  );
}

export default MapPage
