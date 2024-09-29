import imagee from "../assets/images/anonymous.png";
import UserInfos from "@/components/custom/nurse/AcceptedPage/UserInfos";
import Calculation from "@/components/custom/User/user-nurses/accepted page/Calculation";
import { FaRoad } from "react-icons/fa6";
import { MdTimer } from "react-icons/md";
import { AiFillDollarCircle } from "react-icons/ai";
import Call from "@/components/custom/User/user-nurses/accepted page/Call";
import GreenButton from "@/components/custom/GreenButton";
import WhiteButton from "@/components/custom/WhiteButton";
import { NurseDataContext } from "./NurseRoot";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleMap,
  DirectionsRenderer,
  // useJsApiLoader,
  Marker
} from "@react-google-maps/api";






const NurseAccepted = () => {
// const requestData = [
//   {
//     choosen: false,
//     distance: "50 m",
//     firstName: "Chiheb",
//     lastName: "Rahmouni",
//     location: { type: "Point", coordinates: [36.196209, 5.4165] },
//     nursesRequested: ["Dounia Saidi 1"],
//     patient: "Chiheb Rahmouni 2",
//     patientRate: 3,
//     phone: 2,
//     price: 500,
//     service: "Specialized Care",
//     status: "pending",
//     subService: "Diabetes management",
//     time: "1 min",
//     userPatient: 10,
//     _id: "66db2d78c3",
//   },
// ];


// cancel the request
  const cancel = async () => {
    axios
      .put(`${host}/nurses/profile/cancel-request`, {
        patientName: patientName,
      }, {
        headers: {
          Authorization: `${nurseID}`,
        },
      })
      .then(() => {
        window.socket.emit("nurseCanceledUser", patientName);
        navigate("/nurse-cancel");
      })
      .catch((err) => {
        console.log(err);
      })
   }


// finish the work
  const finish = async () => { 
    axios.put(`${host}/nurses/profile/service-end`, {}, {
      headers: {
        Authorization: `${nurseID}`,
      },
    })
      .then(() => {
        navigate("/nurse-feedback");
        window.socket.emit("nurse end work", patientName);
      })
      .catch((err) => {
      console.log(err);
      });
  }

  const host = import.meta.env.VITE_HOST as string;
  const nurseID = import.meta.env.VITE_NURSEID as string;
  // const mapKey = import.meta.env.VITE_MAP_API_KEY as string;
  const { requestData, nurseLocation/*, setNurseLocation*/ } = useContext(NurseDataContext);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [patientRate, setPatientRate] = useState(0);
  const [phone, setPhone] = useState(0);
  const [subService, setSubService] = useState("");
  const [price, setPrice] = useState(0);
  const [patientName, setPatientName] = useState("");
  const [image, setImage] = useState("");
  const [userLocation, setUserLocation] = useState<number[]>([0, 0]);
  const [distance, setDistance] = useState("");
  const [userPatient, setUserPatient] = useState(0);
  const [time, setTime] = useState("");
  const [directions, setDirections] = useState<any>(null);
  // const nurseLocation = [36.215527, 5.441704999999999];



  //when the component mounts
  useEffect(() => {
    setFirstName(requestData[0].firstName);
    setLastName(requestData[0].lastName);
    setPatientRate(requestData[0].patientRate);
    setPhone(requestData[0].phone);
    setPatientName(requestData[0].patient);
    setSubService(requestData[0].subService);
    setPrice(requestData[0].price);
    setImage(imagee);
    setUserLocation(requestData[0].location.coordinates);
    setUserPatient(requestData[0].userPatient);
    // setDistance(requestData[0].distance);
    // setTime(requestData[0].time);

    // when the user cancels the request
    window.socket.on("userCanceledYou", () => {
      navigate("/nurse-canceled-by-patient");
    });
  


    return () => {
      window.socket.off("userCanceledYou");
    };
  }, []);

    // const { isLoaded } = useJsApiLoader({
    //   googleMapsApiKey: mapKey,
    //   id: "google-map-script",
  // });
  
  useEffect(() => {
    const directionsFunction = async () => {
      const directionsService = new window.google.maps.DirectionsService();
      try {
        const result = await directionsService.route({
          origin: { lat: nurseLocation[0], lng: nurseLocation[1] },
          destination: { lat: userLocation[0], lng: userLocation[1] },
          travelMode: google.maps.TravelMode.DRIVING,
        });
        setDirections(result);
        setDistance(result.routes[0].legs[0].distance?.text || "");
        setTime(result.routes[0].legs[0].duration?.text || "");
      } catch (error) {
        console.log(error);
      }
    };
     

      if (userLocation[0] !== 0 && userLocation[1] !== 0) {
        directionsFunction();
    }
    
  }, [userLocation])

    if (typeof window.google === "undefined") return <p className="mt-[100px]">loading...</p>;

    return (
      <div className="main w-full pt-[80px] px-2 min-h-screen">
        <div className="w-full rounded-25 flex flex-col items-center bg-white pt-10 pb-5 px-4 h-[100%]">
          <UserInfos
            service={subService}
            firstName={firstName}
            lastName={lastName}
            rate={patientRate}
            patients={userPatient}
            image={image}
          />

          <div className="map w-full h-[385px] mt-[28px] shadow-hardShadow rounded-20 overflow-hidden border-1 border-mainGreen">
            { window.google && window.google.maps &&
              (<GoogleMap
              center={{ lat: 36.196209, lng: 5.4165 }}
              zoom={12}
              mapContainerStyle={{ height: "100%", width: "100%" }}
              options={{
                zoomControl: false,
                mapTypeControl: false,
                streetViewControl: false,
              }}
            >
              <Marker
                position={{ lat: userLocation[0], lng: userLocation[1] }}
              />
              <Marker
                position={{ lat: nurseLocation[0], lng: nurseLocation[1] }}
              />
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>)}
          </div>

          <div className="calculation w-full px-3 mt-[19px] flex justify-between">
            <Calculation Icon={FaRoad} text={distance} />
            <Calculation Icon={MdTimer} text={time} />
            <Calculation Icon={AiFillDollarCircle} text={price + " Da"} />
          </div>

          {/* <button onClick={directionsFunction}>calculate</button> */}

          <div className="call w-full mt-[36px]">
            <Call firstName={firstName} lastName={lastName} phone={phone} />
          </div>

          <div className="buttons flex w-full gap-4 mt-[36px]">
            <WhiteButton text="Annuler" onClick={cancel} />
            <GreenButton text="Fin de service" onClick={finish} />
          </div>
        </div>
      </div>
    );
};

export default NurseAccepted;









