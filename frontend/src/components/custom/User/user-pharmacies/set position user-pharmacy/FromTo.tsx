import { FaLocationDot } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "@/user/UserRoot";




const FromTo = ({ to }: { to: string }) => {
    
  const [address, setAddress] = useState("");
  const { userLocation, setUserLocation } = useContext(UserDataContext);
  
    // useEffect(() => {
    //   if (userLocation) {
    //     const geocoder = new google.maps.Geocoder();

    //     geocoder.geocode(
    //       { location: { lat: userLocation[0], lng: userLocation[1] } },
    //       (results, status) => {
    //         if (status === "OK") {
    //           setAddress(results![0].formatted_address);
    //         } else {
    //           console.log("Geocoder failed due to: " + status);
    //         }
    //       }
    //     );
    //   }
    // }, [userLocation]);

    
    
    
  return (
    <div className="all flex">
      <div className="icons flex flex-col items-center justify-between py-3 mr-[22px]">
        <div className="from w-5 h-5 border-1 border-black rounded-50"></div>
        <div className="to w-[10px] h-[10px] bg-lightStrockGrey rounded-50"></div>
        <div className="to w-[10px] h-[10px] bg-lightStrockGrey rounded-50"></div>
        <div className="to w-[10px] h-[10px] bg-lightStrockGrey rounded-50"></div>
        <div className="to">
          <FaLocationDot className="text-mainGreen text-[20px] " />
        </div>
      </div>
      {/* icons */}
      <div className="inputs flex flex-col w-full gap-[20px]">
        <input
          type="text"
          placeholder="Choisir un lieu de départ"
          className="input appearance-none outline-none text-[17px] font-bold text-mainWritingGrey w-full h-[47px] bg-EmptyBackgroundGrey ring-1 ring-secondaryWritingGrey rounded-15 px-2 focus:ring-mainGreen"
          value={userLocation}
          // value={address}
          readOnly
        />
        <input
          type="text"
          value={to}
          className="appearance-none outline-none text-[17px] font-bold text-mainWritingGrey w-full h-[47px] bg-EmptyBackgroundGrey ring-1 ring-secondaryWritingGrey rounded-15 px-2 focus:ring-mainGreen"
          readOnly
        />
      </div>
    </div>
  );
};

export default FromTo;
