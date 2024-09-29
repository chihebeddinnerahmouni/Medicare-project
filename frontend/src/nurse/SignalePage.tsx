import { useState, useContext } from "react"
import RateComp from "@/components/custom/RateComp"
import Feedback from "@/components/custom/User/Feedback"
import GreenButton from "@/components/custom/GreenButton"
import { NurseDataContext } from "./NurseRoot"
import axios from "axios"
import { useNavigate } from "react-router-dom"


// const requestData = [
//   {
//     choosen: false,
//     distance: "1 m",
//     firstName: "Chiheb",
//     lastName: "Rahmouni",
//     location: {
//       type: "Point",
//       coordinates: Array(2),
//     },
//     nursesRequested: ["Dounia Saidi 1"],
//     patient: "Chiheb Rahmouni 2",
//     patientRate: 0,
//     phone: 2,
//     price: 500,
//     service: "Home Care",
//     status: "pending",
//     subService: "Meal preparation",
//     time: "1 min",
//     userPatient: 10,
//     _id: "66c47a4fee62e3b4cbf71138",
//   },
// ];




const SignalePage = () => {


    const envoyer = () => {
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
        .then((res: any) => {
          console.log("signaled successfully");
          navigate("/nurse-waiting");
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };




    const host = import.meta.env.VITE_HOST;
    const nurseID = import.meta.env.VITE_NURSEID;
    const { requestData } = useContext(NurseDataContext)
        const [stars, setStars] = useState(0);
        const [comment, setComment] = useState("");
  const [demander, setDemander] = useState(true);
  const navigate = useNavigate();







  return (
    <div>
      <div className="w-full min-h-screen flex flex-col items-center pt-[106px] px-[27px] pb-4">
        <p className="header">Signaler</p>
        <p className="text-center text-secondaryWritingGrey mt-2 font-medium">
          Dites-nous pourquoi vous voulez signaler cette patient ?
        </p>

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
            <GreenButton text="envoyer" onClick={envoyer} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignalePage
