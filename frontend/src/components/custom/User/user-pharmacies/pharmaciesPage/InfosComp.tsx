import { FaPhone } from "react-icons/fa6";
import { FaDirections } from "react-icons/fa";
import Buttons from "./Buttons";
import convert from "@/utils/convert-path";
import { useNavigate } from "react-router-dom";







const InfosComp = ({ image, name, location, status }: any) => {

  const phone = () => { console.log("phone") }
  const directions = () => { console.log("directions") }
  const imagee = convert(image);

  const directionsButton = () => { 
    const navigate = useNavigate();
    navigate("/user-pharmacy/set-details");
  }




  return (
    <div className="flex items-center gap-[10px] h-[80px]">
      <div className="image w-[87px] h-[80px] rounded-15 border-1 border-mainGreen overflow-hidden">
        <img src={imagee} alt="pharmacy door" className="w-full h-full object-cover" />
      </div>
      <div className="infos h-full flex items-center justify-between flex-grow">
        <div className="texts flex flex-col justify-between">
          <p className="text-[18px] text-darkGreen font-medium">{name}</p>
          <p className="text-secondaryWritingGrey font-medium">{location}</p>
          <p
            className={`${
              status === "ouverte" ? "text-mainGreen" : "text-red-500"
            }  font-medium`}
          >
            {status}
          </p>
        </div>
        {/* texts */}

        <div className="buttons flex gap-2">
        {/* <Buttons Icon={FaPhone} onClick={phone} />
        <Buttons Icon={FaDirections} onClick={directions}/> */}
      </div>
      </div>
      {/* infos */}
      
    </div>
  );
};

export default InfosComp;

// http://localhost:3000/assets/doorPic-1723468758692-718129667-pharmacies.jpg