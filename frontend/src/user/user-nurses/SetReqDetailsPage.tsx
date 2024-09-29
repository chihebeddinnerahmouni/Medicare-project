import { useState, useEffect, useContext } from "react";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectService from "../../components/custom/User/user-nurses/set details page/SelectService";
import PositionOptions from "../../components/custom/User/user-nurses/set details page/PositionOptions";
import { UserDataContext } from "../UserRoot";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MapPage from "./MapPage";
// import MapPage from "./MapPage";







const SetReqDetails = () => {


  
  const host = import.meta.env.VITE_HOST;
  const userID = import.meta.env.VITE_USERID;

  const {
    // setResStatus,
    // setNurseList,
    setUserLocation,
    userLocation,
    selectedService,
    setSelectedService,
    selectedSubService,
    setSelectedSubService,
    subServices,
    setSubServices,
    setResultStatus
    // setRequestData,
  } = useContext(UserDataContext);
  const [isValidLocation, setIsValidLocation] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [page, setPage] = useState(1);
  const [Adress, setAdress] = useState("");
  const [user, setUser] = useState<any>();
  const navigate = useNavigate();


  
  
  //when it mounts
  useEffect(() => {
    setResultStatus(0);
    setUserLocation([]);
    setSelectedService("");
    setSelectedSubService("");
    axios.put(`${host}/patients/profile/reset-patient`,
      {},
      {
        headers: {
          Authorization: `${userID}`,
        }
      }
    ).then(res => {
      console.log(res.data.message);
    })
      .catch(err => console.log("reseting patient err ", err));
  }, []);

  // for checking if the user location is valid
  useEffect(() => {
    setIsValidLocation(userLocation && userLocation.length > 0);
  }, [userLocation]);

  // for sending the request to the nearby nurses
  const nearbyNurses = () => {
    navigate("/user-nurse/result");
    axios
      .post(
        `${host}/patients/profile/nearby-nurses`,
        {
          userLocation: userLocation,
          service: selectedService,
          subService: selectedSubService,
        },
        {
          headers: {
            Authorization: `${userID}`,
          },
        }
      )
      .then((res) => {
        setResultStatus(res.status);

        window.socket.emit(
          "sendRequest",
          "chiheb",
          res.data.nurseListNames
        );
      })
      .catch((err) => {
        console.log({ message: "axios error", err });
      });
  };

  // for getting the address from the coordinates
  // useEffect(() => {
  //   if (userLocation.length > 0) {
  //     axios
  //       .get(
  //         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLocation[0]},${userLocation[1]}&key=${import.meta.env.VITE_MAP_API_KEY}`
  //       )
  //       .then((res) => {
  //         setAdress(res.data.results[0].formatted_address);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [userLocation]);



  return (
    <>
      {page == 1 && (
        <div
          className="w-full flex flex-col items-center absolute mt-80 pt-[50px]"
          style={{ minHeight: "calc(100vh - 80px)" }}
        >
          <p className="header">
            Personnalisez votre demande
          </p>

          <div className="service-position w-full buttomShadow mt-[37px] pb-[51px] px-[21px]">
            <SelectService
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              selectedSubService={selectedSubService}
              setSelectedSubService={setSelectedSubService}
              subServices={subServices}
              setSubServices={setSubServices}
            />
            <div className="position mt-6 w-full relative flex items-center">
              <FontAwesomeIcon
                icon={faMapPin}
                className="absolute text-mainGreen left-4 text-[20px]"
              />
              <input
                type="text"
                placeholder="position"
                className="location appearance-none shadow-panelShadow rounded-20 py-2 pl-10 pr-3 w-full h-[44px] outline-none text-darkGreen focus:ring-1 focus:ring-darkGreen4"
                value={userLocation || ""}
                // value={Adress}
                readOnly
                onChange={(e) => {
                  const parts = e.target.value.split(",").map(Number);
                  setUserLocation(parts);
                }}
              />
            </div>
          </div>

          <div className="taht w-full pb-4 px-[21px] flex flex-col relative items-center flex-grow justify-between">
            <div className="positionOptions mt-[26px] w-full ">
              <PositionOptions
                setUserLocation={setUserLocation}
                setPage={setPage}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>

            <button
              className={`w-full h-[54px] rounded-[15px] shadow-panelShadow text-[18px] font-medium   ${
                isValidLocation &&
                selectedService !== "" &&
                selectedSubService !== ""
                  ? "bg-mainGreen text-white"
                  : "bg-[#D7DBE1] text-mainWritingGrey"
              }`}
              disabled={
                !(
                  isValidLocation &&
                  selectedService !== "" &&
                  selectedSubService !== ""
                )
              }
              onClick={nearbyNurses}
            >
              Terminer
            </button>
          </div>
        </div>
      )}

      {/* {page == 2 && <MapPage setPage={setPage} />} */}
      {page == 2 && <MapPage setPage={setPage} />}
    </>
  );
};

export default SetReqDetails;
