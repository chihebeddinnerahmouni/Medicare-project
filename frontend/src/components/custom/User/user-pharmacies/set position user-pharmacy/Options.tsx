import { faCrosshairs, faMap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { UserDataContext } from "@/user/UserRoot";

const Options = ({ setSelectedOption, selectedOption, setPage, setIsCardDown }: any) => {
    const { setUserLocation } = useContext(UserDataContext);

    const option1 = () => {
        console.log("option1");
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
        },
            (error) => { 
                console.log("error", error);
            });
        setSelectedOption('option1');
  };
  
  const option2 = () => { 
    setPage(2);
    setSelectedOption('option2');
    setIsCardDown(true);
  }
     




  return (
    <div className="Options w-full flex flex-col items-start">
      <div
        className={`option1 flex items-center gap-3 ${
          selectedOption === "option1" ? "text-mainGreen" : "text-mainWritingGrey"
        }`}
      >
        <FontAwesomeIcon icon={faCrosshairs} className="text-[20px]" />
        <button onClick={option1}>Utuliser ma position</button>
      </div>
      <hr className="border-t-2 border-darkGreen1 my-[17px] w-[95%] self-end" />
      <div
        className={`option2 flex items-center gap-3 ${
          selectedOption === "option2" ? "text-mainGreen" : "text-mainWritingGrey"
        }`}
      >
        <FontAwesomeIcon icon={faMap} className="text-[20px]" />
        <button onClick={option2}>Selectionner sur le map</button>
      </div>
    </div>
  );
};

export default Options
