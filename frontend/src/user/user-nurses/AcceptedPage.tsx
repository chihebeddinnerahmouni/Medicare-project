import Map from '@/components/custom/User/user-nurses/accepted page/Map';
import NurseInfos from "../../components/custom/User/user-nurses/accepted page/NurseInfos";
import Calculation from '@/components/custom/User/user-nurses/accepted page/Calculation';
import { FaRoad } from "react-icons/fa6";
import { MdTimer } from "react-icons/md";
import { AiFillDollarCircle } from "react-icons/ai";
import Call from '@/components/custom/User/user-nurses/accepted page/Call';
import GreenButton from '@/components/custom/GreenButton';
import { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '@/user/UserRoot';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";




// const serveNurse = {
//   nurseFirstName: 'Dounia',
//   nurseLastName: 'Saidi',
//   nurseRate: 0,
//   nurseSpecialite: 'Kolch',
//   nurseClients: 0,
//   price: 500,
//   nursePhone: 1,
//   phone:1,
//   nurseName: 'Dounia Saidi 1',
// }



const Accepted = () => {

  const AnullerFunc = () => { 
    axios
      .put(`${host}/patients/profile/cancel-request`, {
        nurseName: nurseName,
      }, {
        headers: {
          Authorization: `${userID}`,
        },
      })
      .then((res) => {
        // Navigate("waaaaay");
        window.socket.emit("userCancelNurse", nurseName);
        Navigate("/user-nurse/cancel");
      })
      .catch((err) => {
        console.log(err);
      });
  }


  const { serveNurse, userLocation } = useContext(UserDataContext);

  const Navigate = useNavigate();
  const host = import.meta.env.VITE_HOST;
  const userID = import.meta.env.VITE_USERID;
  const mapKey = import.meta.env.VITE_MAP_API_KEY
  const [nurseLocation, setNurseLocation] = useState<any>([0, 0]);
  const [specialite, setSpecialite] = useState<string>("");
  const [rate, setRate] = useState<number>(0);
  const [clients, setClients] = useState<number>(0);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [nurseName, setNurseName] = useState<string>("");
  const [distance, setDistance] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  




  
  


  // when it mounts
  useEffect(() => {
    setFirstName(serveNurse.nurseFirstName);
  setLastName(serveNurse.nurseLastName);
  setRate(serveNurse.nurseRate);
  setSpecialite(serveNurse.nurseSpecialite);
  setClients(serveNurse.nurseClients);
  setPrice(serveNurse.price);
  setPhone(serveNurse.phone);
    setNurseName(serveNurse.nurseName);
    setDistance(serveNurse.distance);
    setTime(serveNurse.time);
    setNurseLocation(serveNurse.location);

    window.socket.on("nurse ended work", () => {
      Navigate("/user-nurse/rating");
    });

    window.socket.on("nurseCanceledYou", () => {
      Navigate("/user-nurse/canceled-by-nurse");
    });

    window.socket.on("CurrentNurseLocation", (location: [Number]) => {
      setNurseLocation(location);
      console.log("location", location);
    });

    return () => {
      window.socket.off("nurse ended work");  
      window.socket.off("nurseCanceledYou");
      window.socket.off("CurrentNurseLocation");
    }
  }, [])


  return (
    <div className="min-h-screen pt-[96px] flex flex-col items-center">
      <div className="infos w-full mt-3 px-[36px]">
        <NurseInfos
          speciality={specialite}
          name={firstName + " " + lastName}
          rate={rate}
          patients={clients}
        />
      </div>

      <div className="map mt-[17px] h-[380px] w-full border-[1px] border-mainGreen rounded-20 overflow-hidden" style={{width: 'calc(100% - 52px)'}}>
        {/* <LoadScript googleMapsApiKey={mapKey}>
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "100%",
              borderRadius: "20px",
            }}
            center={{ lat: nurseLocation[0], lng: nurseLocation[1] }}
            zoom={12.5}
           options={{ 
    disableDefaultUI: true,
    styles: [
      {
        featureType: 'landscape.natural',
        elementType: 'geometry',
        stylers: [{color: '#ffffff'}]
      },
    ]
  }}
          >
            <Marker position={{ lat: userLocation[0], lng: userLocation[1] }} />
            <Marker position={{ lat: nurseLocation[0], lng: nurseLocation[1] }}/>
          </GoogleMap>
        </LoadScript> */}
      </div>

      <div className="down w-full flex flex-col flex-grow pb-3 justify-around mt-3">
      <div className="calcul flex justify-between w-full px-[40px]">
        <Calculation Icon={FaRoad} text={distance} />
        <Calculation Icon={MdTimer} text={time} />
        <Calculation Icon={AiFillDollarCircle} text={price + " Da"} />
      </div>

      <div className="call w-full">
          <Call firstName={"Nrs. " + lastName} lastName={firstName} phone={phone} />
      </div>

      <div className="button w-full px-[26px]">
        <div className="cont">
          <GreenButton text={"Annuler"} onClick={AnullerFunc} />
        </div>
      </div>
    </div>


    </div>
  );
}

export default Accepted
