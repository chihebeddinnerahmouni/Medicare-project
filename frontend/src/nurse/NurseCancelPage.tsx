import Option from "@/components/custom/User/Option";
import { useState } from "react";
import Feedback from "@/components/custom/User/Feedback";
import GreenButton from "@/components/custom/GreenButton";
import { useContext } from "react";
import { NurseDataContext } from "./NurseRoot";
import { useNavigate } from "react-router-dom";



const NurseCancelPage = () => {

  const { requestData } = useContext(NurseDataContext);
      const [reason1, setReason1] = useState<boolean>(false);
      const [reason2, setReason2] = useState<boolean>(false);
      const [reason3, setReason3] = useState<boolean>(false);
      const [reason4, setReason4] = useState<boolean>(false);
      const [comment, setComment] = useState<string>("");
  const [demander, setDemander] = useState<boolean>(true);
  const navigate = useNavigate();

      const envoyer = () => {
        // console.log("Envoyer");
        navigate("/nurse-waiting");
      };

      return (
        <div className="pt-[115px] min-h-screen flex flex-col items-center px-[28px]">
          <p className="header text-center">Annulation de la service</p>
          <p className="text-center text-secondaryWritingGrey mt-2 font-medium">
            Dites-nous pourquoi vous avez annulé votre service ?
          </p>

          <div className="checkboxes w-full pl-[33px] mt-[37px] flex flex-col gap-2">
            <Option
              text={"Urgence médicale ou cas prioritaire"}
              setReason={setReason1}
              reason={reason1}
            />
            <Option
              text={"Préoccupations de sécurité"}
              setReason={setReason2}
              reason={reason2}
            />
            <Option
              text={"Raison 3"}
              setReason={setReason3}
              reason={reason3}
            />
            <Option text={"Raison 4"} setReason={setReason4} reason={reason4} />
          </div>

          <div className="taht w-full flex-grow flex flex-col justify-between pb-8">
            <div className="comment w-full mt-[37px] ">
              <Feedback
                demander={demander}
                setDemander={setDemander}
                setComment={setComment}
                firstName={requestData[0].firstName}
                lastName={requestData[0].lastName}
              />
            </div>

            <div className="button w-full ">
              <GreenButton text={"Envoyer"} onClick={envoyer} />
            </div>
          </div>
        </div>
      );
};

export default NurseCancelPage;
