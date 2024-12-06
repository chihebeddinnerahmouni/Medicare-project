import { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import WhiteButton from "../../WhiteButton";
import { NurseDataContext } from "@/pages/nurse/NurseRoot";


const ReqTaken = () => {

   const { setIsTaken, setReqTaken } = useContext(NurseDataContext);

  useEffect(() => {
    setInterval(() => { 
      setIsTaken(false);
      setReqTaken(false);
    }, 10000);
   }, []);

  const retour = () => { 
    setIsTaken(false);
    setReqTaken(false);
  }

  return (
    <div className="bg-white w-full p-4 border-1 border-mainGreen rounded-20 flex flex-col items-center">
      <p className="text-[25px] font-medium text-darkGreen">Ooops!</p>
      <p className="text-[18px] font-medium text-secondaryWritingGrey text-center">
        la demande n'est plus disponible, veuillez appuyer sur Retour pour
        attendre à nouveau
      </p>

      <FontAwesomeIcon icon={faTimesCircle} className="text-red-400 text-[118px] mt-[38px]" /> 

      <div className="mt-[40px] w-full" >
        <WhiteButton text="Retour" onClick={retour} />      
      </div>
      
    </div>
  );
};

export default ReqTaken;
