import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { createClient } from "@google/maps";

// const mapKey =import.meta.env.VITE_MAP_API_KEY;
// const googleMapsClient = createClient({
//   key: mapKey,
// });


interface PositionOptionsProps {
  setUserLocation: (value: number[]) => void;
  setPage: (value: number) => void;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}


const PositionOptions: React.FC<PositionOptionsProps> = ({
  setUserLocation,
  setPage,
  selectedOption,
  setSelectedOption,
}) => {

  const option1 = () => {
    setSelectedOption("option1");
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation([position.coords.latitude, position.coords.longitude]);
    });
  };

  //  const option1 = () => {
  //    setSelectedOption("option1");
  //    googleMapsClient.geolocate({}, (err, response) => {
  //      if (err) {
  //        console.log(err);
  //      } else {
  //        setUserLocation([
  //          response.json.location.lat,
  //          response.json.location.lng,
  //        ]);
  //      }
  //    });
  //  };

  const option2 = () => {
    setSelectedOption("option2");
    setPage(2);
  };

  return (
    <div className="Options w-full flex flex-col items-start">
      <div
        className={`option1 flex items-center gap-3 ${
          selectedOption === "option1" ? "text-mainGreen" : "text-darkGreen"
        }`}
      >
        <FontAwesomeIcon icon={faCrosshairs} className="text-[20px]" />
        <button onClick={option1}>Utuliser ma position</button>
      </div>
      <hr className="border-t-2 border-darkGreen1 my-[17px] w-[95%] self-end" />
      <div
        className={`option2 flex items-center gap-3 ${
          selectedOption === "option2" ? "text-mainGreen" : "text-darkGreen"
        }`}
      >
        <FontAwesomeIcon icon={faMap} className="text-[20px]" />
        <button onClick={option2}>Selectionner sur le map</button>
      </div>
    </div>
  );
};

export default PositionOptions;
