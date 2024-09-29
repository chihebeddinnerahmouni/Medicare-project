import { useContext } from "react"
import { UserDataContext } from "../UserRoot"
import BasicInfos from "@/components/custom/User/user-pharmacies/pharmaciesPage/BasicInfos"
import { LiaDirectionsSolid } from "react-icons/lia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import pic1 from "@/assets/images/pharmacy details 1.jpg";
import pic2 from "@/assets/images/pharmacy details 2.jpg";
import pic3 from "@/assets/images/pharmacy details 3.jpg";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";








const OnePharmacyPage = () => {

    const cardMove = () => { console.log('move') }


    const host = import.meta.env.VITE_HOST;
    const mapKey = import.meta.env.VITE_MAP_API_KEY;
  const { onePharmacy } = useContext(UserDataContext)
  const navigate = useNavigate()

  const go = () => {
    navigate("/user-pharmacy/set-details")
  }
    
  return (
    <>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          top: "80px",
          left: 0,
          zIndex: 0,
        }}
        center={{ lat: 36.156697, lng: 5.418235 }}
        zoom={13}
      >
        <Marker
          position={{
            lat: onePharmacy.location.coordinates[0],
            lng: onePharmacy.location.coordinates[1],
          }}
        />
      </GoogleMap>

      <div
        className={`card pt-[18px] flex flex-col items-center px-[18px] border-1 border-mainGreen bg-white absolute bottom-0 left-[50%] translate-x-[-50%] rounded-tr-20 rounded-tl-20`}
        style={{ width: "calc(100% - 30px)" }}
      >
        <button
          className="move border-2 w-[50px] border-darkGreen"
          onClick={cardMove}
        ></button>
        <div className="infos w-full mt-3">
          <BasicInfos
            pharmacy={onePharmacy}
            onClick={() => navigate("/user-pharmacy/all-pharmacies")}
          />
        </div>
        <div className="taht w-full mt-[26px] px-4">
          <div className="buttons flex gap- w-full justify-center gap-[60px] ">
            <button
              className="flex items-center justify-center rounded-10 gap-1.5 text-white bg-mainGreen w-[118px] h-[42px]"
              onClick={go}
            >
              <LiaDirectionsSolid className="text-[29px]" />{" "}
              <span className="text-[14px] font-medium">Itinéraire</span>
            </button>
            <button className="flex items-center justify-center rounded-10 gap-1.5 text-mainGreen border-1 border-mainGreen w-[118px] h-[42px]">
              <FontAwesomeIcon icon={faBookmark} className="text-[20px]" />{" "}
              <span className="text-[14px] font-medium">Enregistrer</span>
            </button>
          </div>
          {/* buttons */}

          <div className="photos w-full flex mt-[30px] gap-2 mb-4 h-[200px]">
            <div className="left h-full w-[50%]">
              <img
                src={pic1}
                alt=""
                className="h-full w-full object-cover rounded-10 border-1 border-mainGreen"
              />
            </div>
            <div className="right w-[50%] flex flex-col justify-between h-[200px] gap-2">
              <img
                src={pic2}
                alt=""
                className="object-cover h-[96px] rounded-10 border-1 border-mainGreen"
              />
              <img
                src={pic3}
                alt=""
                className="object-cover h-[96px] rounded-10 border-1 border-mainGreen"
              />
            </div>
          </div>
        </div>{" "}
        {/* taht */}
      </div>
    </>
  );}

export default OnePharmacyPage


