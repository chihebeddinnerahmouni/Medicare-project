import React, { useState, createContext, useEffect } from "react";
import userData from "../assets/files/userData";



export const UserDataContext = createContext<any>({});

  
const UserRoot = ({ children }: { children: React.ReactNode }) => {
  const [userLocation, setUserLocation] = useState([]);

  // user-nurse
  const [selectedService, setSelectedService] = useState("");
  const [selectedSubService, setSelectedSubService] = useState("");
  const [subServices, setSubServices] = useState([]);
  const [nurseList, setNurseList] = useState([]);
  const [resStatus, setResStatus] = useState(0);
  // const [acceptedRequest, setAcceptedRequest] = useState({state: false,nurseData: {},});
  const [requestData, setRequestData] = useState({});
  const [markerPosition, setMarkerPosition] = useState(null);
  const [ph, setPh] = useState("");
  const [serveNurse, setServeNurse] = useState();
  const [resultStatus, setResultStatus] = useState(0);

  //user-pharmacy
  const [onePharmacy, setOnePharmacy] = useState<any>();
  const [transportType, setTransportType] = useState("car");




    useEffect(() => {
      if (userData) window.socket.emit("ownRoom", userData.name);
    }, []);

  //console.log("userLocation", userLocation);
  // console.log("selectedService:", selectedService);
  // console.log("selectedSubService:", selectedSubService);
  //console.log("subServices", subServices);
  //console.log("nurseList", nurseList);
  //console.log("resStatus", resStatus);
  //console.log("acceptedRequest", acceptedRequest);

  return (
    <div>
      <UserDataContext.Provider
        value={{
        //   userData,
        //   setUserData,
          userLocation,
          setUserLocation,
          selectedService,
          setSelectedService,
          selectedSubService,
          setSelectedSubService,
          subServices,
          setSubServices,
          nurseList,
          setNurseList,
        //   nurseRequestName ,
        //   setNurseRequestName,
        //   isWaiting,
        //   setIsWaiting,
          resStatus,
          setResStatus,
          // acceptedRequest,
          // setAcceptedRequest,
          requestData,
          setRequestData,
          markerPosition,
          setMarkerPosition,
          ph,
          setPh,
          serveNurse,
          setServeNurse,
          onePharmacy,
          setOnePharmacy,
          resultStatus,
          setResultStatus,
          transportType,
          setTransportType,
        }}
      >
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserRoot;
