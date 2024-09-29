import "ldrs/cardio";
import { useEffect, useContext } from "react";
import { UserDataContext } from "../UserRoot";
import { useNavigate } from "react-router-dom";



const WaitToBeAccepted = () => {

    const { setServeNurse } = useContext(UserDataContext);
    const navigate = useNavigate();

  // when it mounts
    useEffect(() => { 
        window.socket.on("requestAccepted", (nurseData: any) => {
          setServeNurse(nurseData);
          navigate("/user-nurse/accepted");
        });

        return () => {
          window.socket.off('requestTaken');
        }
    }, []);
  
  
  

  return (
    <div className="flex justify-center flex-col gap-9 items-center h-screen">
      <p className="header">Please wait</p>
      <l-cardio
        size={"100px"}
        stroke={"5px"}
        color={"#199B8A"}
        transforme
      ></l-cardio>
    </div>
  );
};

export default WaitToBeAccepted;
