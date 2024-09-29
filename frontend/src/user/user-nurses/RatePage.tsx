import { useState } from "react";
import Name from "@/components/custom/User/Name";
import image from "@/assets/images/nurse woman.png";
import RateComp from "@/components/custom/RateComp";
import Feedback from "@/components/custom/User/Feedback";
import GreenButton from "@/components/custom/GreenButton";
import { UserDataContext } from "../UserRoot";
import { useContext } from "react";
import axios from "axios";



const RatePage = () => {


  const envoyer = async () => { 
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
        console.log("Rated");
       })
      .catch((err) => { 
        console.log(err);
      });
  }



  const host = import.meta.env.VITE_HOST;
  const userID = import.meta.env.VITE_USERID;
  const { serveNurse } = useContext(UserDataContext);

  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [demander, setDemander] = useState(true);


  return (
    <div
      className="tout w-full mt-80 flex flex-col items-center px-[27px] pb-4 relative"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      <p className="header mt-10">évaluez votre infirmiére</p>
      <div className="name mt-7">
        <Name image={image} firstName={"Nrs. " + serveNurse.nurseFirstName} lastName={serveNurse.nurseLastName} />
      </div>

      <div className="stars mt-[10px] w-full h-[55px]">
        <RateComp setStars={setStars} />
      </div>

      <p className="text-[20px] font-semibold text-darkGreen mt-[30px] ">
       Commentaire prive
      </p>

      <div className="feedback w-full mt-8 mb-20">
        <Feedback
            demander={demander}
            setDemander={setDemander}
          setComment={setComment}
          firstName={"Nrs. "+serveNurse.nurseFirstName}
          lastName={serveNurse.nurseLastName}
          />
      </div>

      <div className="buttoms w-full absolute bottom-0 mb-6" style={{width: 'calc(100% - 54px)'}}>
        <GreenButton text="envoyer" onClick={envoyer} />
     </div>

    </div>
  );
}

export default RatePage


