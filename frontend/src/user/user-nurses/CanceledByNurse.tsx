import {useContext} from 'react'
import { UserDataContext } from '@/user/UserRoot'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";



const CanceledByNurse = () => {


 const yes = () => {
   navigate("/user-nurse/signal");
 };
 const retour = () => {
   navigate("/user-nurse/set-details");
 };

    const { serveNurse } = useContext(UserDataContext)
    const navigate = useNavigate();

  return (
    <div
      className="w-full mt-80 flex flex-col justify-center items-start px-8"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      <div className="con flex flex-col items-start justify-center">
        <div className="X w-[50px] h-[50px] ml-7 bg-red-500 rounded-50 flex justify-center items-center">
          <FontAwesomeIcon icon={faXmark} className="text-[35px] text-white " />
        </div>

        <p className="header mt-5">Demande annulée</p>
        <p className="text text-[18px] mt-2 text-mainWritingGrey font-medium">
          La demande a été annulée par Nrs. {serveNurse.nurseFirstName}
        </p>
        <p className="text text-[16px] text-secondaryWritingGrey font-medium">
          Voulez-vous nous laisser un feedback ?
        </p>

        <div className="buttons flex gap-3 mt-8">
          <button
            className="text-[18px] text-white font-medium bg-red-500 px-4 py-1 rounded-[5px]"
            onClick={yes}
          >
            Oui
          </button>
          <button
            className="text-[18px] text-secondaryWritingGrey font-medium px-4 py-1 rounded-[5px]"
            onClick={retour}
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  );
}

export default CanceledByNurse
