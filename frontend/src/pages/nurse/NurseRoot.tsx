import { useState, useEffect, createContext } from "react";
import nurseData from "@/assets/files/nurseData";
// import axios from "axios";


export const NurseDataContext = createContext<any>({});

const NurseRoot = ({ children }: any) => {


  // const [nurseData, setNurseData] = useState();
  const [nurseLocation, setNurseLocation] = useState([]);
  const [isWork, setIsWork] = useState(false);
  const [isTaken, setIsTaken] = useState(false);
  const [reqTaken, setReqTaken] = useState(false);
  const [requestData, setRequestData] = useState({});
  // const [isRejected, setIsRejected] = useState(false);


  useEffect(() => {
    if (nurseData) window.socket.emit("ownRoom", nurseData.name);
  }, []);
  



  return (
    <NurseDataContext.Provider value={{ /*nurseData, setNurseData,*/ /*setNurseData, requestData*/ isWork ,setIsWork, isTaken, setIsTaken, requestData, setRequestData, nurseLocation, setNurseLocation, /*isRejected, setIsRejected, isPending, setIsPending */ reqTaken, setReqTaken}}>
        {children}
   </NurseDataContext.Provider>
  );
};

export default NurseRoot;
