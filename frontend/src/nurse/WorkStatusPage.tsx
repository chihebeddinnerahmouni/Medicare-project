import { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import SwitchState from "@/components/custom/nurse/Nurse waiting page/SwitchState";
import { NurseDataContext } from "./NurseRoot";
import RequestPage from "./RequestPage";
import ReqTaken from "@/components/custom/nurse/Nurse waiting page/ReqTaken";
import axios from "axios";

declare global {
  interface Window {
    socket: any;
  }
}

const WorkStatusPage = () => {

  const { isWork, isTaken, reqTaken, setReqTaken, setIsTaken, setRequestData } = useContext(NurseDataContext);
  const [state, setState] = useState("Hors service");
  const [disc, setDisc] = useState("Vous êtes maintenant hors service, activez l'état du service si vous souhaitez commencer à travailler.");
  const host = import.meta.env.VITE_HOST;
  const nurseID = import.meta.env.VITE_NURSEID;

  useEffect(() => { 

    setIsTaken(false);

    window.socket.on("newRequest", () => { 
setIsTaken(true);
    });
    
// reseting the nurse
    axios.put(`${host}/nurses/profile/reset-nurse`, {}, {
      headers: {
        Authorization: `${nurseID}`,
      },
    }).then((res) => {
      console.log(res.data.message);
    }).catch((err) => {
      console.log({message: "axios err", err});
    });
    
    return () => {
      window.socket.off("newRequest");
    };
  }, []);



  useEffect(() => {
    if (!isWork) {
      setState("Hors service");
      setDisc("Vous êtes maintenant hors service, activez l'état du service si vous souhaitez commencer à travailler.");
    } else {
      setState("En service");
      setDisc("Vous êtes maintenant en service, veuillez attendre les demandes");
    }
  }, [isWork])

  return (
    <div className="mt-[80px] relative" style={{minHeight: 'calc(100vh - 80px)'}}>
      <div className="w-full flex flex-col items-center pt-[157px] px-5 h-[100%]" style={isTaken ? {filter: "blur(3px) brightness(70%)", pointerEvents: "none"} : {}}>
        <div className="switch absolute right-[30px] top-[20px]"><SwitchState /></div>
        <span className="header transition-all duration-500">{state}</span>
        <span className="text-[18px] font-medium text-secondaryWritingGrey text-center mt-3">
         {disc}
        </span>
        <div className="image w-full flex justify-center items-center absolute top-[55%] translate-y-[-55%]">
        {isWork?<FontAwesomeIcon icon={faCheck} className="text-mainGreen text-[200px] transition-all duration-500" /> :<FontAwesomeIcon icon={faXmark} className="text-red-400 text-[200px] transition-all duration-500" />}
        </div>
      </div>
      
      {isTaken && !reqTaken && <div className="request absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%]" style={{ width: 'calc(100% - 60px)' }}>
        <RequestPage />
      </div>}


      {isTaken && reqTaken && <div className="request absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%]" style={{ width: 'calc(100% - 60px)' }}>
        <ReqTaken />
      </div>}


    

 </div> );
}

export default WorkStatusPage;
