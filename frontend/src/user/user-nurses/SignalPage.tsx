import { useState } from "react";
import RateComp from "@/components/custom/RateComp";
import Feedback from "@/components/custom/User/Feedback";
import GreenButton from "@/components/custom/GreenButton";
import { useContext } from "react";
import { UserDataContext } from "../UserRoot";
import axios from "axios";
import { useNavigate } from "react-router-dom";





const SignalPage = () => {

  const send = () => { 
    axios.put(`${host}/patients/profile/rate-nurse`, {
      rating: stars,
      comment: comment,
      matchAgain: demander,
      nurseName: serveNurse.nurseName
    }, {
      headers: {
        Authorization: `${userID}`
      }
    })
      .then((res) => {
        console.log("signaled");
        Navigate("/user-nurse/set-details");
    
       })
      .catch((err) => { 
        console.log(err);
      });
  }


    const [stars, setStars] = useState(0);
    const [comment, setComment] = useState("");
  const [demander, setDemander] = useState(true);
  const { serveNurse } = useContext(UserDataContext);
  const Navigate = useNavigate();
const host = import.meta.env.VITE_HOST;
const userID = import.meta.env.VITE_USERID;

    return (
      <div className="w-full min-h-screen flex flex-col items-center pt-[106px] px-[27px] pb-4">
        <p className="header">Signaler</p>
        <p className="text-center text-secondaryWritingGrey mt-2 font-medium">
          Dites-nous pourquoi vous voulez signaler cette infirmier ?
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
              firstName={serveNurse.firstName}
              lastName={serveNurse.lastName}
            />
          </div>

          <div className="button">
            <GreenButton text="envoyer" onClick={send} />
          </div>
        </div>
      </div>
    );
};

export default SignalPage;
