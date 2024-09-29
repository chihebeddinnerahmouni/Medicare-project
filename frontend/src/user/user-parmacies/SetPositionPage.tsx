import BasicInfos from "@/components/custom/User/user-pharmacies/pharmaciesPage/BasicInfos"
import { UserDataContext } from "../UserRoot"
import { useEffect, useContext, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import FromTo from "@/components/custom/User/user-pharmacies/set position user-pharmacy/FromTo"
import Transport from "@/components/custom/User/user-pharmacies/set position user-pharmacy/Transport"
import Options from "@/components/custom/User/user-pharmacies/set position user-pharmacy/Options"
import {
  GoogleMap,
  // LoadScript,
  Marker
} from "@react-google-maps/api"




// const onePharmacy = {
//   address: "6C3V+9P5, Setif, Algeria",
//   codingAdress: "8F876C3V+CJH",
//   doorPicture:
//     "C:\\Users\\Administrator\\Desktop\\Medicare-app\\backend\\src\\assets\\doorPic-1723468795466-954023664-pharmacie door 2 .jpg",
//   location: {
//     coordinates: [36.203551, 5.444108],
//     type: "Point",
//   },
//   name: "Zaabar",
//   phone: 700000006,
//   workStatus: true,
// };



const SetPositionPage = () => { // main function

  const terminerHandler = () => {
    console.log("terminer");
    navigate("/user-pharmacy/show-directions");
   };


  const host = import.meta.env.VITE_HOST;
  const mapKey = import.meta.env.VITE_MAP_API_KEY;
  // const [TransportType, setTransportType] = useState("car");
  const [selectedOption, setSelectedOption] = useState("");
  const [isValidLocation, setIsValidLocation] = useState(false);
  const [page, setPage] = useState(1);
  const [isCardDown, setIsCardDown] = useState(false);
  const navigate = useNavigate();
  const {
    userLocation,
    onePharmacy,
    setUserLocation,
    transportType,
    setTransportType,
  } = useContext(UserDataContext);


  useEffect(() => {
    if (userLocation && userLocation.length !== 0) { 
      setIsValidLocation(true);
    }
   }, [userLocation]);

  useEffect(() => { 
    setUserLocation([])
  }, []);

  // console.log(transportType);

  return (
    <div
      className="w-full relative mt-80 overflow-hidden"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
        <GoogleMap
          mapContainerStyle={{
            height: "calc(100vh - 80px)",
            width: "100%",
            // marginTop: "80px",
            position: "absolute",
          }}
          center={{ lat: 36.141517, lng: 5.408962 }}
          zoom={12.5}
          options={{
            disableDefaultUI: true,
            gestureHandling: page !== 2 ? "none" : "auto",
            zoomControl: page === 2,
            styles: [
              {
                featureType: "landscape.natural",
                elementType: "geometry",
                stylers: [{ color: "#ffffff" }],
              },
            ],
          }}
          onClick={(e) => {
            if (page !== 2) return;
            setUserLocation([e.latLng!.lat(), e.latLng!.lng()]);
            setIsCardDown(false);
            setPage(1);
          }}
        >
          {userLocation && (
            <Marker position={{ lat: userLocation[0], lng: userLocation[1] }} />
          )}
        </GoogleMap>

      <div
        className={`card pt-[18px] flex flex-col items-center border-1 border-mainGreen bg-white absolute left-[50%] translate-x-[-50%] rounded-tr-20 rounded-tl-20 ${
          isCardDown ? "bottom-[-470px]" : "bottom-[0px]"
        } transition-all`}
        style={{ width: "calc(100% - 30px)" }}
      >
        <button className="move border-2 w-[50px] border-darkGreen"></button>
        <div className="basicInfos w-full mt-[16px] px-[18px]">
          <BasicInfos
            pharmacy={onePharmacy}
            onClick={() => {
              navigate("/user-pharmacy/one-pharmacy");
            }}
          />
        </div>
        <div className="from-to w-full px-[18px] mt-[26px]">
          <FromTo to={onePharmacy.codingAdress} />
        </div>
        <div className="buttomShadow px-[18px] buttons w-full mt-[34px] pb-[30px]">
          <Transport
            transportType={transportType}
            setTransportType={setTransportType}
          />
        </div>
        <div className="options mt-[30px] w-full px-[18px]">
          <Options
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
            setPage={setPage}
            setIsCardDown={setIsCardDown}
          />
        </div>

        <div className="terminer w-full px-[18px] mt-[52px] pb-[30px] ">
          <button
            className={`w-full h-[54px] rounded-[15px] shadow-panelShadow text-[18px] font-medium   ${
              isValidLocation
                ? "bg-mainGreen text-white"
                : "bg-[#D7DBE1] text-mainWritingGrey"
            }`}
            disabled={!isValidLocation}
            onClick={terminerHandler}
          >
            Terminer
          </button>
        </div>
      </div>
    </div>
  );
}

export default SetPositionPage
