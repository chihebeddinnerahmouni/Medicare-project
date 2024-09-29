import { useState } from "react";
import Name from "@/components/custom/User/Name";
import image from "@/assets/images/anonymous.png";
import RateComp from "@/components/custom/RateComp";
import Feedback from "@/components/custom/User/Feedback";
import GreenButton from "@/components/custom/GreenButton";
import axios from "axios";
import { NurseDataContext } from "./NurseRoot";
import { useContext } from "react";




// const requestData = [{
//   choosen: false,
//   distance: "1 m",
//   firstName: "Chiheb",
//   lastName: "Rahmouni",
//   location: {
//     type: 'Point', 
//     coordinates: Array(2) // replace with actual coordinates
//   },
//   nursesRequested: ['Dounia Saidi 1'],
//   patient: "Chiheb Rahmouni 2",
//   patientRate: 0,
//   phone: 2,
//   price: 500,
//   service: "Specialized Care",
//   status: "pending",
//   subService: "Respiratory care",
//   time: "1 min",
//   userPatient: 10,
//   _id: "66c4b61f35803261f817c979"
// }]




const NurseRatePage = () => {

  const send = () => { 
    axios
      .put(
        `${host}/nurses/profile/rate-patient`,
        {
          rating: stars,
          patientName: requestData[0].patient,
          comment: comment,
          matchAgain: demander,
        },
        {
          headers: {
            Authorization: `${nurseID}`,
          },
        }
      )
      .then((res) => {
        console.log("rated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };


      

  const host = import.meta.env.VITE_HOST;
  const nurseID = import.meta.env.VITE_NURSEID;
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [demander, setDemander] = useState(true);
  const { requestData } = useContext(NurseDataContext);


      return (
        <div className="w-full min-h-screen flex flex-col items-center pt-[106px] px-[27px] pb-4">
          <p className="header">évaluez votre patient</p>

          <div className="name mt-5">
            <Name image={image} firstName={requestData[0].firstName} lastName={requestData[0].lastName} />
          </div>

          <div className="stars mt-[30px] w-full h-[55px]">
            <RateComp setStars={setStars} />
          </div>

          <p className="text-[20px] font-semibold text-darkGreen mt-[40px] ">
            Commentaire prive
          </p>

          <div className="taht mt-[30px]  flex flex-col justify-between flex-grow w-full">
            <div className="feedback mb-12">
              <Feedback
                demander={demander}
                setDemander={setDemander}
                setComment={setComment}
                firstName={requestData[0].firstName}
                lastName={requestData[0].lastName}
              />
            </div>

            <div className="button">
              <GreenButton text="envoyer" onClick={send} />
            </div>
          </div>
        </div>
      );
};

export default NurseRatePage;
