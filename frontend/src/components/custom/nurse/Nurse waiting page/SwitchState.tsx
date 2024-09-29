import  { useRef, useContext } from "react";
import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { NurseDataContext } from "../../../../nurse/NurseRoot";



const SwitchState = () => {

 const { setIsWork, isWork, isTaken, setNurseLocation }: any = useContext(NurseDataContext);
 const switchStateRef = useRef<HTMLDivElement | null>(null);

  const nurseID = import.meta.env.VITE_NURSEID;

    const switchStateButton = () => {
      if (switchStateRef.current!.classList.contains("active")) {
        setIsWork(false);
        switchStateRef.current!.classList.remove("active");
     axios
       .put(
         "http://localhost:3000/nurses/profile/change-not-working",
         {},
         {
           headers: {
             Authorization: `${nurseID}`,
           },
         }
       )
       .then((res) => {
        //  switchStateRef.current!.classList.remove("active");
        //  toast.success(res.data.message);
        //  setIsWork(false);
       })
       .catch((err) => {
         console.log("axios err", err);
       });
    //  setIsWork(false);
      } else {
        setIsWork(true);
        switchStateRef.current!.classList.add("active"); // switched on
     navigator.geolocation.getCurrentPosition(
       function (position) {
         let lat = position.coords.latitude;
         let long = position.coords.longitude;
         axios
           .put(
             "http://localhost:3000/nurses/profile/change-work-status",
             {
               location: [lat, long],
             },
             {
               headers: {
                 Authorization: `${nurseID}`,
               },
             }
           )
           .then((res) => {
            //  switchStateRef.current!.classList.add("active"); 
            //  toast.success(res.data.message);
             setNurseLocation([lat, long]);
            //  setIsWork(true);
           })
           .catch((err) => {
             console.log("axios err", err);
           });
       },
       function (err) {
         console.log("geolocation err", err);
       }
     );
   }
 };



  return (

      <div ref={switchStateRef} onClick={switchStateButton}>
        <label className="toggle-btn">
          <input type="checkbox" />
          <span className="toggle-text"></span>
        </label>
      </div>
  );
};

export default SwitchState;
