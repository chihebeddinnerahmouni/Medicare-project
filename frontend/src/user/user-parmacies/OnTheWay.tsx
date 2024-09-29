import { useNavigate } from "react-router-dom";
import { UserDataContext } from "@/user/UserRoot";
import { useContext, useEffect, useState } from "react";
import Transport from "@/components/custom/User/user-pharmacies/onTheWayPage/Transport";
import GreenButton from "@/components/custom/GreenButton";
import Arrived from "./Arrived";
import image from "@/assets/images/pharmacy details 1.jpg";
import {
  GoogleMap,
  Marker,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";


// const onePharmacy = {
//   address: "6C3V+9P5, Setif, Algeria",
//   codingAdress: "8F876C3V+CJH",
//   doorPicture: "C:\\Users\\Administrator\\Desktop\\Medicare-app\\backend\\src\\assets\\doorPic-1723468795466-954023664-pharmacie door 2 .jpg",
//   location: {
//     type: 'Point', 
//     coordinates: [36.203829, 5.443840]
//   },
//   name: "Zaabar",
//   phone: 700000006,
//   workStatus: false
// };



const OnTheWay = () => {

    const arrivedFunction = () => {
        setArrived(true);
  }
  
  const directionsFunction = async (transportType : string) => {
    const directionsService = new window.google.maps.DirectionsService();
    // try {
    // console.log(transportType)
      const result = await directionsService.route({
        origin: { lat: userLocation[0], lng: userLocation[1] },
        destination: { lat: destination[0], lng: destination[1] },
        travelMode: transportType === "car" ? google.maps.TravelMode.DRIVING : google.maps.TravelMode.WALKING,
      });
      setDirections(result);
      setDistance(result.routes[0].legs[0].distance?.text || "");
      setTime(result.routes[0].legs[0].duration?.text || "");
    // } catch (error) {
    //   console.log(error);
    // }
  };



  const [isCardDown, setIsCardDown] = useState(false);
  const [directions, setDirections] = useState<any>(null);
  const [destination, setDestination] = useState([0,0]);
  const { /**/onePharmacy, userLocation, transportType, setTransportType } = useContext(UserDataContext);
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  const [currentHour, setCurrentHour] = useState("");
  const [arrived, setArrived] = useState(false);
  // const userLocation = [36.171523, 5.415341];

  useEffect(() => { 
    setDestination([onePharmacy.location.coordinates[0], onePharmacy.location.coordinates[1]]);
      const updateTime = () => {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();
        const time = `${currentHour
          .toString()
          .padStart(2, "0")}:${currentMinutes.toString().padStart(2, "0")}`;
        setCurrentHour(time);
      };

      updateTime();
    const intervalId = setInterval(updateTime, 60000);
    
    return () => clearInterval(intervalId);
  }, []);


  useEffect(() => { 
    if (destination[0] !== 0 && destination[1] !== 0) {
      directionsFunction(transportType);
    }
  }, [destination]);


  useEffect(() => { 
    directionsFunction(transportType);
  }, [transportType]);

  if (typeof window.google === "undefined") return <p className="mt-[90px]">loading...</p>
  

  return (
    <div
      className="w-full h-full relative mt-80"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      {window.google && window.google.maps && (
        <GoogleMap
          center={{ lat: 36.171523, lng: 5.4165 }}
          zoom={13}
          mapContainerStyle={{ height: "calc(100vh - 80px)", width: "100vw", filter: arrived ? "blur(5px)" : "none" }}
          options={{
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            gestureHandling: arrived ? 'none' : 'auto',
            draggable: !arrived,
          }}
        >
          <Marker position={{ lat: userLocation[0], lng: userLocation[1] }} />
          <Marker position={{ lat: destination[0], lng: destination[1] }} />
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      )}

      <div
        className={`card pt-[18px] pb-[30px] px-5 flex flex-col items-center border-1 border-mainGreen bg-white absolute left-[50%] translate-x-[-50%] rounded-tr-20 rounded-tl-20 ${
          isCardDown ? "bottom-[-470px]" : "bottom-[0px]"
        } transition-all`}
        style={{ width: "calc(100% - 30px)" }}
      >
        {!arrived ? (
          <>
            <button className="move border-2 w-[50px] border-darkGreen"></button>
            <p className="text-[25px] mt-1 font-medium text-darkGreen">
              {distance}
            </p>
            <div className="others flex justify-evenly w-full mt-1">
              <p className="font-semibold text-secondaryWritingGrey">{time}</p>
              <p className="font-semibold text-secondaryWritingGrey">
                {currentHour}
              </p>
            </div>
            <div className="transport w-full mt-6">
              <Transport
                transport={transportType}
                setTransport={setTransportType}
              />
            </div>
            <div className="button w-full mt-6">
              <GreenButton text={"Arriveé"} onClick={arrivedFunction} />
            </div>
          </>
        ) : (
          <>
              <Arrived name={onePharmacy.name} />
          </>
        )}
      </div>
    </div>
  );
};

export default OnTheWay;
