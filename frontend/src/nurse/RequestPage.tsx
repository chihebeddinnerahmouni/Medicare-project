import { useEffect, useContext, useState } from 'react';
import image from '../assets/images/anonymous.png';
import UserInfos from '@/components/custom/nurse/AcceptedPage/UserInfos';
// import Map from '@/components/custom/nurse/AcceptedPage/Map';
import Calculation from '@/components/custom/User/user-nurses/accepted page/Calculation';
import { FaRoad } from "react-icons/fa6";
import { MdTimer } from "react-icons/md";
import { AiFillDollarCircle } from "react-icons/ai";
import Call from '@/components/custom/User/user-nurses/accepted page/Call';
import GreenButton from '@/components/custom/GreenButton';
import WhiteButton from '@/components/custom/WhiteButton';
import { NurseDataContext } from './NurseRoot';
import axios from 'axios';
import nurseData from '@/assets/files/nurseData';
// import request from '@/assets/files/requestResponse';
import {
  GoogleMap,
  Marker,
  // LoadScript,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useNavigate } from 'react-router-dom';



const requestData = [
  {
    choosen: false,
    distance: "50 m",
    firstName: "Chiheb",
    lastName: "Rahmouni",
    location: { type: "Point", coordinates: [36.196209, 5.4165] },
    nursesRequested: ["Dounia Saidi 1"],
    patient: "Chiheb Rahmouni 2",
    patientRate: 3,
    phone: 2,
    price: 500,
    service: "Specialized Care",
    status: "pending",
    subService: "Diabetes management",
    time: "1 min",
    userPatient: 10,
    _id: "66db2d78c3",
  },
];

const RequestPage = () => {
  //accept function
  const accept = () => {
    axios
      .put(
        `${host}/nurses/profile/accept-request`,
        {},
        {
          headers: {
            Authorization: `${nurseID}`,
          },
        }
      )
      .then((response) => {
        window.socket.emit("acceptRequest", patientName, {
          nurseFirstName: nurseData.firstName,
          nurseLastName: nurseData.lastName,
          nursePhone: nurseData.phone,
          nurseRate: nurseData.averageRating,
          nurseSpecialite: nurseData.specialite,
          nurseClients: nurseData.patientClients,
          nurseName: nurseData.name,
          price: 500,
          distance: requestData[0].distance,
          time: requestData[0].time,
          location: nurseLocation,
        });
        navigate("/nurse-accepted");
      })
      .catch((error) => {
        console.log("from recieving accept error ", error);
      });
  };

  //decline function
  const decline = () => {
    axios
      .put(
        `${host}/nurses/profile/refuse-request`,
        {},
        {
          headers: {
            Authorization: `${nurseID}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.message);
        setIsTaken(false);
      })
      .catch((error) => {
        console.log("from recieving decline error ", error);
      });
  };

  const mapKey = import.meta.env.VITE_MAP_API_KEY as string;
  const nurseID = import.meta.env.VITE_NURSEID as string;
  const host = import.meta.env.VITE_HOST as string;
  const navigate = useNavigate();
  const {
    // setReqTaken,
    nurseLocation,
    /*requestData,*/ setRequestData,
    setIsTaken,
  } = useContext(NurseDataContext);
  // stats
  const [subService, setSubService] = useState("");
  const [userFirstName, setFirstUserName] = useState("");
  const [userLastName, setLastUserName] = useState("");
  const [userRate, setUserRate] = useState(0);
  const [userPatients, setUserPatients] = useState(0);
  // const [userImage, setUserImage] = useState('');
  const [userLocation, setUserLocation] = useState<number[]>([]);
  const [userPhone, setUserPhone] = useState(0);
  const [distance, setDistance] = useState(0);
  const [price, setPrice] = useState(0);
  const [time, setTime] = useState(0);
  const [patientName, setPatientName] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: mapKey,
    id: "google-map-script",
  });

  // when it mounts
  useEffect(() => {
    // for the request taken by other nurse
    // window.socket.on("requestTaken", (nurseData: any) => {
    //   setReqTaken(true);
    // });

    // for getting the request data
    axios
      .get(`${host}/nurses/profile/get-request`, {
        headers: {
          Authorization: `${nurseID}`,
        },
      })
      .then((res: any) => {
        setRequestData(res.data);
        setSubService(res.data[0].subService);
        setFirstUserName(res.data[0].firstName);
        setLastUserName(res.data[0].lastName);
        setUserRate(res.data[0].patientRate);
        setUserPatients(res.data[0].userPatient);
        setUserLocation(res.data[0].location.coordinates);
        setUserPhone(res.data[0].phone);
        setPatientName(res.data[0].patient);
        setDistance(res.data[0].distance);
        setPrice(res.data[0].price);
        setTime(res.data[0].time);
        // setUserImage(requestData.image || image);
      })
      .catch((err: any) => {
        console.log(err);
      });

    //the cleanup
    return () => {
      window.socket.off("requestTaken");
    };
  }, []);

  if (!isLoaded) return <div>Loading</div>

  return (
    <div className="w-full border-1 border-mainGreen rounded-25 flex flex-col items-center bg-white py-6 px-4">
      <UserInfos
        service={subService}
        firstName={userFirstName}
        lastName={userLastName}
        rate={userRate}
        patients={userPatients}
        image={image}
      />

      <div className="map w-full h-[286px] mt-[19px] shadow-hardShadow rounded-20 border-[1px] border-mainGreen">
        {/* <LoadScript googleMapsApiKey={mapKey}> */}
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "100%",
              borderRadius: "20px",
            }}
            center={{ lat: userLocation[0], lng: userLocation[1] }}
            zoom={13.5}
            options={{
              disableDefaultUI: true,
              styles: [
                {
                  featureType: "landscape.natural",
                  elementType: "geometry",
                  stylers: [{ color: "#ffffff" }],
                },
              ],
            }}
          >
            <Marker position={{ lat: userLocation[0], lng: userLocation[1] }} />
            <Marker
              position={{ lat: nurseLocation[0], lng: nurseLocation[1] }}
            />
          </GoogleMap>
        {/* </LoadScript> */}
      </div>

      <div className="calculation w-full mt-[19px] flex justify-between">
        <Calculation Icon={FaRoad} text={distance} />
        <Calculation Icon={MdTimer} text={time} />
        <Calculation Icon={AiFillDollarCircle} text={price} />
      </div>

      <div className="call w-full mt-[26px]">
        <Call
          firstName={userFirstName}
          lastName={userLastName}
          phone={userPhone}
        />
      </div>

      <div className="buttons flex w-full gap-4 mt-[22px]">
        <WhiteButton text="Decline" onClick={decline} />
        <GreenButton text="Accept" onClick={accept} />
      </div>
    </div>
  );
}

export default RequestPage
